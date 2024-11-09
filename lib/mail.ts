import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/account-verification?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your account",
        html: `<p><a href=${confirmLink} target="_blank">click here to confirm your email</a></p>`,
    });
};
export const sendResetEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p><a href=${resetLink} target="_blank">click here to reset your password </a></p>`,
    });
};
export const send2FAEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "2FA Code",
        html: `<div><p>You 2FA code:</p></br><p>${token}</p></div>`,
    });
};
