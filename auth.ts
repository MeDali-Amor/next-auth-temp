import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { db } from "./lib/db";
import { getUserById } from "./utils/user";
import { Role } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/login",
        error: "/auth-error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            // allow oauth without email verification
            if (account?.provider !== "credentials") return true;

            // prevent sign in without email verification
            const existingUser = await getUserById(user.id!);
            if (!existingUser?.emailVerified) return false;
            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as Role;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const user = await getUserById(token.sub);
            if (!user) return token;
            token.role = user.role;
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
