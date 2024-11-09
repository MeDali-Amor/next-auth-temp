"use server";
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { send2FAEmail, sendVerificationEmail } from "@/lib/mail";
import { generate2FAToken, generateVerificationToken } from "@/lib/tokens";
import { get2FAConfirmationByUserId } from "@/lib/two-factor-confirmation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/user";
import { User } from "@prisma/client";
import { AuthError } from "next-auth";
import * as zod from "zod";

export const login = async (values: zod.infer<typeof LoginSchema>) => {
    const validationData = LoginSchema.safeParse(values);
    const { success } = validationData;
    if (!success) {
        const errorMessage = validationData?.error.errors
            ? validationData.error.errors
                  ?.map((e) => `${e.path?.[0]} : ${e.message},`)
                  ?.join("\n")
            : "error: invalid credentials";
        return {
            error: errorMessage,
        };
    }

    const { email, password, code2FA } = validationData.data;
    const user = (await getUserByEmail(email)) as User;
    if (!user) {
        return { error: "Invalid credentials" };
    }
    if (!user.emailVerified) {
        const verificationToken = await generateVerificationToken(user.email);
        await sendVerificationEmail(email, verificationToken.token);

        return {
            success: "A verification email was send to this email address",
        };
    }
    if (user.isTowFactorEnabled) {
        if (code2FA) {
            const twoFactorToken = await db.twoFactorToken.findFirst({
                where: {
                    email: user.email,
                },
            });
            if (!twoFactorToken || twoFactorToken.token !== code2FA) {
                return { error: "Invalid code" };
            }
            const hasExpired = new Date(twoFactorToken.expiresAt) < new Date();
            if (hasExpired) {
                return { error: "Token has expired" };
            }
            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id },
            });
            const existaing2FConfirmation = await get2FAConfirmationByUserId(
                user.id
            );
            if (existaing2FConfirmation) {
                db.twoFactorConfirmation.delete({
                    where: { id: existaing2FConfirmation.id },
                });
            }
            await db.twoFactorConfirmation.create({
                data: {
                    userId: user.id,
                },
            });
        } else {
            const twoFactorToken = await generate2FAToken(user.email);
            await send2FAEmail(user.email, twoFactorToken.token);
            return {
                success: "A 2FA confirmation code was sent to your email",
                twoFA: true,
            };
        }
    }
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
        return {
            success: "logged in successfully",
            error: undefined,
        };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { success: undefined, error: "invalid credentials" };
                case "CallbackRouteError":
                    return { success: undefined, error: "invalid credentials" };
                case "OAuthAccountNotLinked":
                    return {
                        success: undefined,
                        error: "This email is already in use with google provider, try using the google login.",
                    };
                default:
                    return { success: undefined, error: "an error occured!" };
            }
        }
        throw error;
    }
};
export const googleSignIn = async (provider: "google") => {
    try {
        await signIn(provider, {
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
        return {
            success: "logged in successfully",
            error: undefined,
        };
    } catch (error) {
        if (error instanceof AuthError) {
            return { success: undefined, error: "an error occured!" };
        }
        throw error;
    }
};
