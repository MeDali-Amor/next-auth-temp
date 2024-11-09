"use server";

import * as bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { UpdatePasswordSchema } from "@/schemas";
import { getResetTokenByToken } from "@/utils/token";
import { getUserByEmail } from "@/utils/user";
import * as zod from "zod";

export const passwordUpdate = async (
    token: string,
    values: zod.infer<typeof UpdatePasswordSchema>
) => {
    const validationData = UpdatePasswordSchema.safeParse(values);
    const { success } = validationData;
    if (!success) {
        const errorMessage = validationData?.error.errors
            ? validationData.error.errors
                  ?.map((e) => `${e.path?.[0]} : ${e.message},`)
                  ?.join("\n")
            : "error: invalid password";
        return {
            error: errorMessage,
        };
    }

    const { password } = validationData.data;
    const existingToken = await getResetTokenByToken(token);
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
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
        where: { id: existingUser.id },
        data: {
            password: hashedPassword,
        },
    });
    await db.resetToken.delete({
        where: { id: existingToken.id },
    });
    return { success: "Your password has been reset!" };
};
