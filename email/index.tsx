import nodemailer from "nodemailer";
import { DEBUG, MAIL_FORM, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_SECURE_ENABLED, SMTP_USER, WEBAPP_URL } from "@/lib/constants";
import { createToken } from "@/lib/jwt";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { render } from "@react-email/render";
import { EmailTemplate } from "./components/general/email-template";
import { VerificationEmail } from "./components/auth/verification-email";
import { ForgotPasswordEmail } from "./components/auth/forgot-password-email";
import { PasswordResetNotifyEmail } from "./components/auth/password-reset-notify-email";

export const IS_SMTP_CONFIGURED = Boolean(SMTP_HOST && SMTP_PORT);

interface SendEmailDataProps {
    to: string;
    replyTo?: string;
    subject: string;
    text?: string;
    html?: string;
}

interface TEmailUser {
    id: string;
    email: string;
}

export const sendEmail = async (emailData: SendEmailDataProps) => {
    if (!IS_SMTP_CONFIGURED) return; 

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE_ENABLED, // true for 465, false for other ports
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASSWORD,
        },
        logger: DEBUG,
        debug: DEBUG,
    } as SMTPTransport.Options);
    const emailDefaults = {
        from: `Bachelore mate <${MAIL_FORM ?? "noreply@bacheloremate.com"}>`,
    };
    try {
        await transporter.sendMail({ ...emailDefaults, ...emailData});
        console.log("email sended successfully")
    } catch (e:any) {
        console.error(e.message);
    }
}

export const sendVerificationEmail = async (user: TEmailUser) => {
    const token = createToken(user.id, user.email, {
        expiresIn: "1d",
    });
    const verifyLink = `${WEBAPP_URL}/auth/verify?token=${encodeURIComponent(token)}`;
    const verificationRequestLink = `${WEBAPP_URL}/auth/verification-requested?email=${encodeURIComponent(
        user.email
    )}`;
    await sendEmail({
        to: user.email,
        subject: "Please verify your email to use Bacheloremate",
        html: await render(EmailTemplate({ content: VerificationEmail({ verificationRequestLink, verifyLink }) }))
    })
};

export const sendForgotPasswordEmail = async (user: TEmailUser) => {
    const token = createToken(user.id, user.email, {
        expiresIn: "1d",
    });
    const verifyLink = `${WEBAPP_URL}/auth/forgot-password/reset?token=${encodeURIComponent(token)}`;
    await sendEmail({
        to: user.email,
        subject: "Reset your Bacheloremate password",
        html: await render(EmailTemplate({ content: ForgotPasswordEmail({ verifyLink }) })),
    });
};

export const sendPasswordResetNotifyEmail = async (user: TEmailUser) => {
    await sendEmail({
        to: user.email,
        subject: "Your Bacheloremates password has been changed",
        html: await render(EmailTemplate({ content: PasswordResetNotifyEmail() })),
    });
};