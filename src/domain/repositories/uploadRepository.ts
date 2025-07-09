export interface UserRepository {
  updateAvatar(userId: string, filename: string): Promise<any>;
  findById(id: string): Promise<any>;
  removeAvatar(id: string): Promise< any | null>;
}