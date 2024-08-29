"use server";
import { RegisterSchema } from "@/schemas/indes";
import * as zod from "zod";
import * as bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/utils/user";

export const register = async (values: zod.infer<typeof RegisterSchema>) => {
    const { error, data } = RegisterSchema.safeParse(values);
    if (error?.errors) {
        return {
            error: error.errors
                ?.map((e) => `${e.path?.[0]} : ${e.message},`)
                ?.join("\n"),
        };
    }

    const { email, password, username } = data!;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return {
            error: "Email already registerd!",
        };
    }
    await db.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
        },
    });

    return {
        success: "Account created Successfully!",
    };
};
