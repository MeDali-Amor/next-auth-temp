import Google from "next-auth/providers/google";
import * as bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./utils/user";
import { User } from "@prisma/client";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const { success, data } = LoginSchema.safeParse(credentials);
                if (success) {
                    const { email, password } = data;
                    const user = (await getUserByEmail(email)) as User;
                    if (!user || !user.password) return null;
                    const passwordMatch = await bcrypt.compare(
                        // bcrypt is causing errors, use bcryptjs
                        password,
                        user.password
                    );
                    if (passwordMatch) return user;
                }
                return null;
            },
        }),
        // Google,
    ],
} satisfies NextAuthConfig;
