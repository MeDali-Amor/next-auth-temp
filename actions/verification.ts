"use server";

import { db } from "@/lib/db";
import { getVerificationTokenByToken } from "@/utils/token";
import { getUserByEmail } from "@/utils/user";

export const emailVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) {
        return { error: "Token does not exist" };
    }
    const hasExpired = new Date(existingToken.expiresAt) < new Date();
    if (hasExpired) {
        return {
            error: "Token has expired!",
        };
    }
    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return { error: "Email does not exist" };
    }
    await db.user.update({
        where: { email: existingToken.email },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        },
    });
    await db.verificationToken.delete({
        where: { id: existingToken.id },
    });
    return { success: "Your email is verified!" };
};
