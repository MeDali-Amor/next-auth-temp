"use server";
import { LoginSchema } from "@/schemas/indes";
import * as zod from "zod";

export const login = async (values: zod.infer<typeof LoginSchema>) => {
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
        success: "Successfull login!",
    };
};
