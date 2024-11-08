"use server";
import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas/indes";
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

    const { email, password } = validationData.data;
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
