import { sendEmail } from "@/adapter/email/emailAdapter";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Função genérica para envio de email
 */
const sendAppEmail = async ({
  to,
  subject,
  html,
}: EmailOptions): Promise<{ success: boolean; data: unknown }> => {
  return await sendEmail({
    to,
    subject,
    html,
  });
};

/**
 * Email de avaliação de serviço
 */
export const sendRatingEmail = async (to: string, workerName: string, clientName: string) => {
  const html = `
    <p>Olá <b>${workerName}</b>,</p>
    <p><b>${clientName}</b> deixou uma avaliação sobre os seus serviços.</p>
    <p>Acesse a plataforma para conferir a avaliação.</p>
  `;

  return await sendAppEmail({
    to,
    subject: "Nova avaliação recebida",
    html,
  });
};

/**
 * Email de pedido de serviço
 */
export const sendServiceRequestEmail = async (
  to: string,
  workerName: string,
  clientName: string
) => {
  const html = `
    <p>Olá <b>${workerName}</b>,</p>
    <p>O cliente <b>${clientName}</b> solicitou um serviço.</p>
    <p>Acesse a plataforma para aceitar ou rejeitar o pedido.</p>
  `;

  return await sendAppEmail({
    to,
    subject: "Novo pedido de serviço",
    html,
  });
};

/**
 * Email de resposta ao cliente sobre pedido de serviço
 */
export const sendServiceResponseEmail = async (
  to: string,
  clientName: string,
  workerName: string,
  status: "aceito" | "rejeitado"
) => {
  const html = `
    <p>Olá <b>${clientName}</b>,</p>
    <p>O trabalhador <b>${workerName}</b> ${status === "aceito" ? "aceitou" : "rejeitou"} o seu pedido de serviço.</p>
    <p>Obrigado pela sua preferência!</p>
  `;

  return await sendAppEmail({
    to,
    subject: "Atualização do pedido de serviço",
    html,
  });
};