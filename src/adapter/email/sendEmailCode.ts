import { sendEmail } from '@/adapter/email/emailAdapter';

interface ActivationEmailOptions {
  to: string;
  name: string;
  code: string;
}

/**
 * Envia email de ativação de conta
 */
export const sendActivationEmail = async ({
  to,
  name,
  code,
}: ActivationEmailOptions): Promise<{ success: boolean; data: unknown }> => {
  const activationLink = `https://https://kuvica-webapp.vercel.app/activate`;

  const html = `
    Olá <b>${name}</b>,
    <p>Bem-vindo(a) à Kuvika! Estamos muito felizes em tê-lo(a) connosco.</p>
    <p>Para ativar sua conta, insira o código abaixo no aplicativo ou clique no link:</p>
    <h2>${code}</h2>
    <a href="${activationLink}">Ativar minha conta</a>
    <p>Se você não solicitou este código, ignore este email.</p>
  `;

  return await sendEmail({
    to,
    subject: 'Ativação da conta',
    html,
  });
};