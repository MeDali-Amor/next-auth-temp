import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.APP_URL}/account-verification?token=${token}`;
    const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: email,
        subject: "Confirm your account",
        html: `<p><a href=${confirmLink} target="_blank">click here to confirm your email</a></p>`,
    });
    if (error) {
        console.log(error);
    }
};
export const sendResetEmail = async (email: string, token: string) => {
    const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`;
    const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: email,
        subject: "Reset your password",
        html: `<p><a href=${resetLink} target="_blank">click here to reset your password </a></p>`,
    });
    if (error) {
        console.log(error);
    }
};
export const send2FAEmail = async (email: string, token: string) => {
    const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: email,
        subject: "2FA Code",
        html: `<div><p>You 2FA code:</p></br><p>${token}</p></div>`,
    });
};
