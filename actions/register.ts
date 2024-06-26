"use server";
import { LoginSchema, RegisterSchema } from "@/schemas/indes";
import * as zod from "zod";

export const register = async (values: zod.infer<typeof RegisterSchema>) => {
    const { error } = LoginSchema.safeParse(values);
    console.log(error?.errors);
    if (error?.errors) {
        return {
            error: error.errors
                ?.map((e) => `${e.path?.[0]} : ${e.message},`)
                ?.join("\n"),
        };
    }
    return {
        success: "Account created Successfully!",
    };
};
