"use server";
import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } });
        return user;
    } catch (error) {
        return error;
    }
};
export const getUserById = async (id: string): Promise<User> => {
    try {
        const user = await db.user.findUnique({ where: { id } });
        return user;
    } catch (error) {
        return error;
    }
};
