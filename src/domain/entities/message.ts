export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
  recipientId: string;
  isFromClient: boolean;
}