import { sendEmail } from '@/adapter/email/emailAdapter';

interface PasswordChangedEmailOptions {
  to: string;
  name: string;
}

export const sendPasswordChangedEmail = async ({
  to,
  name,
}: PasswordChangedEmailOptions): Promise<{ success: boolean; data: unknown }> => {
  const html = `
    Olá <b>${name}</b>,
    <p>Informamos que sua senha foi alterada com sucesso.</p>
    <p>Se você realizou essa alteração, pode ignorar esta mensagem.</p>
    <p><b>ATENÇÃO:</b> Se você não reconhece essa atividade, por favor redefina sua senha imediatamente e entre em contato com o suporte.</p>
    <p>Atenciosamente,<br/>Equipe Kuvika</p>
  `;

  return await sendEmail({
    to,
    subject: 'Senha alterada com sucesso',
    html,
  });
};