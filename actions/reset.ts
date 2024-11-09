"use server";

import { getUserByEmail } from "@/utils/user";
import { ResetSchema } from "../schemas";
import { z } from "zod";
import { generateResetToken } from "@/lib/tokens";
import { sendResetEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validationData = ResetSchema.safeParse(values);
    if (!validationData.success) {
        const errorMessage = validationData?.error.errors
            ? validationData.error.errors
                  ?.map((e) => `${e.path?.[0]} : ${e.message},`)
                  ?.join("\n")
            : "error: invalid email";
        return {
            error: errorMessage,
        };
    }
    const { email } = values;
    const user = await getUserByEmail(email);
    console.log(user);
    if (!user) {
        return { error: "User not found" };
    }

    const resetToken = await generateResetToken(email);
    await sendResetEmail(resetToken.email, resetToken.token);

    return {
        success: "A reset email was sent",
    };
};
