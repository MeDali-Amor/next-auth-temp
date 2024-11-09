import * as zod from "zod";

export const LoginSchema = zod.object({
    email: zod
        .string()
        .min(1, {
            message: "Email is required",
        })
        .email(),
    password: zod.string().min(1, {
        message: "Password is required",
    }),
    code2FA: zod.optional(zod.string()),
});
export const ResetSchema = zod.object({
    email: zod
        .string()
        .min(1, {
            message: "Email is required",
        })
        .email(),
});
export const RegisterSchema = zod
    .object({
        email: zod
            .string()
            .min(1, {
                message: "Email is required",
            })
            .email(),
        password: zod.string().min(6, {
            message: "Password should be at least 6 characters long",
        }),
        passwordConfirm: zod.string().min(6, {
            message: "Password should be at least 6 characters long",
        }),
        username: zod.string().min(1, {
            message: "username is required",
        }),
    })
    .superRefine(({ password, passwordConfirm }, ctx) => {
        if (password !== passwordConfirm) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match ",
                path: ["passwordConfirm"],
            });
        }
    });

export const UpdatePasswordSchema = zod.object({
    password: zod.string().min(6, {
        message: "Password should be at least 6 characters long",
    }),
    passwordConfirm: zod.string().min(6, {
        message: "Password should be at least 6 characters long",
    }),
});
