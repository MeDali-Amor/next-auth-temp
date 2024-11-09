import { v4 as uuid4 } from "uuid";
import { db } from "./db";
import crypto from "crypto";

export const generateVerificationToken = async (email: string) => {
    const token = uuid4();
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000);
    const oldToken = await db.verificationToken.findFirst({
        where: { email },
    });
    if (oldToken) {
        await db.verificationToken.delete({
            where: {
                id: oldToken.id,
            },
        });
    }
    const newToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expiresAt,
        },
    });
    return newToken;
};
export const generateResetToken = async (email: string) => {
    const token = uuid4();
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000);
    const oldToken = await db.resetToken.findFirst({
        where: { email },
    });
    if (oldToken) {
        await db.resetToken.delete({
            where: {
                id: oldToken.id,
            },
        });
    }
    const newToken = await db.resetToken.create({
        data: {
            email,
            token,
            expiresAt,
        },
    });
    return newToken;
};
export const generate2FAToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expiresAt = new Date(new Date().getTime() + 3600 * 250);
    const oldToken = await db.twoFactorToken.findFirst({
        where: { email },
    });
    if (oldToken) {
        await db.twoFactorToken.delete({
            where: {
                id: oldToken.id,
            },
        });
    }
    const newToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expiresAt,
        },
    });
    return newToken;
};
