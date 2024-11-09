import { db } from "./db";

export const get2FAConfirmationByUserId = async (userId: string) => {
    try {
        const tFC = await db.twoFactorConfirmation.findUnique({
            where: { userId },
        });
        return tFC;
    } catch (error) {
        return null;
    }
};
