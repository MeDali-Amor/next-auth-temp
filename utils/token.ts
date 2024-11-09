import { db } from "@/lib/db";

const getTokenByType = <T>(
    findFunction: (args: { where: { token: string } }) => Promise<T | null>
) => {
    return async (token: string): Promise<T | null> => {
        try {
            return await findFunction({ where: { token } });
        } catch (error) {
            return null;
        }
    };
};

export const getVerificationTokenByToken = getTokenByType(
    db.verificationToken.findUnique
);

export const getResetTokenByToken = getTokenByType(db.resetToken.findUnique);
export const getTwoFactorTokenByToken = getTokenByType(
    db.twoFactorToken.findUnique
);
