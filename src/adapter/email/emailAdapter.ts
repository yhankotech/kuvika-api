import nodemailer from 'nodemailer'
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { env } from '@/config/env';
import { logger } from '@/shared/loggers/winston';

// Tipagem dos dados de envio
interface SendMailParams {
  to: string;
  subject: string;
  html: string;
}

// Transporter configurado com base nas variáveis de ambiente
const options: SMTPTransport.Options = {
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.EMAIL_SECURE,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: !env.EMAIL_TLS ? false : true,
  }
};

const transporter = nodemailer.createTransport(options);

export const verifyEmailConnection = async () => {
  try {
    await transporter.verify();
    logger.info('✅ Conexão SMTP bem-sucedida!');
  } catch (error) {
    logger.error('❌ Erro ao conectar ao servidor de e-mail:', error);
    throw error;
  }
};

/**
 * Configura o conteúdo do email
 */
const buildEmailOptions = ({ to, subject, html }: SendMailParams) => ({
  from: env.EMAIL_NAME || env.EMAIL_USER,
  to,
  subject,
  text: 'Ativação de conta', // texto plano como fallback
  html
});

/**
 * Envia um e-mail com as opções fornecidas
 */
export const sendEmail = async ({ to, subject, html }: SendMailParams): Promise<{ success: boolean, data: unknown }> => {
  try {
    const response = await transporter.sendMail(buildEmailOptions({ to, subject, html }));
    return { 
        success: true, 
        data: response 
    };
  } catch (error) {
    return { 
        success: false, 
        data: error 
    };
  }
};