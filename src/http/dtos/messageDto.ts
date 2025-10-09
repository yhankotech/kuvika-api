export interface SendMessageDTO {
  content: string;
  senderId: string;
  recipientId: string;
  isFromClient: boolean;
}

export interface MessageResponseDTO {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
  recipientId: string;
  isFromClient: boolean;
}