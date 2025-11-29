/* eslint-disable @typescript-eslint/no-explicit-any */
// EmailJS doesn't have types, using require
const emailjs = require('@emailjs/nodejs');
import { env } from '../config/env';

// Initialize EmailJS with credentials
export const initEmailJS = () => {
    if (env.EMAILJS_PUBLIC_KEY && env.EMAILJS_PRIVATE_KEY) {
        emailjs.init({
            publicKey: env.EMAILJS_PUBLIC_KEY,
            privateKey: env.EMAILJS_PRIVATE_KEY,
        });
    }
};

export interface EmailParams {
    [key: string]: string | number | boolean;
}

/**
 * Send an email using EmailJS
 */
export const sendEmail = async (
    templateParams: EmailParams,
    templateId?: string
): Promise<{ success: boolean; message: string }> => {
    try {
        if (!env.EMAILJS_SERVICE_ID || !env.EMAILJS_TEMPLATE_ID) {
            return { success: false, message: 'EmailJS not configured' };
        }

        const response = await emailjs.send(
            env.EMAILJS_SERVICE_ID,
            templateId ?? env.EMAILJS_TEMPLATE_ID,
            templateParams as any
        );

        if (response.status === 200) {
            return { success: true, message: 'Email sent successfully' };
        }

        return { success: false, message: 'Failed to send email' };
    } catch (error) {
        console.error('EmailJS Error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Email sending failed',
        };
    }
};

/**
 * Send order confirmation email
 */
export const sendOrderConfirmation = async (params: {
    to_email: string;
    to_name: string;
    order_id: string;
    order_total: string;
    order_items: string;
}) => {
    return sendEmail(params);
};

/**
 * Send password reset email
 */
export const sendPasswordReset = async (params: {
    to_email: string;
    to_name: string;
    reset_link: string;
}) => {
    return sendEmail(params);
};

/**
 * Send welcome email
 */
export const sendWelcomeEmail = async (params: {
    to_email: string;
    to_name: string;
}) => {
    return sendEmail(params);
};

/**
 * Send contact form notification
 */
export const sendContactNotification = async (params: {
    from_name: string;
    from_email: string;
    subject: string;
    message: string;
}) => {
    return sendEmail(params);
};

export const emailService = {
    sendEmail,
    sendOrderConfirmation,
    sendPasswordReset,
    sendWelcomeEmail,
    sendContactNotification,
};

export default emailService;
