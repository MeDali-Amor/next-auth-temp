import { v4 as uuid4 } from "uuid";
import { db } from "./db";
import { getVerificationTokenByEmail } from "@/utils/token";

export const generateVerificationToken = async (email: string) => {
    const token = uuid4();
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000);
    const oldToken = await getVerificationTokenByEmail(email);
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
