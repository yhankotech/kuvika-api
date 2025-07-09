import fs from 'fs';
import path from 'path';
import { UserRepository } from '../../domain/repositories/uploadRepository';
import { ResourceNotFoundError } from '../../shared/errors/error';

export class ManageClientAvatarUseCase {
  constructor(private userRepository: UserRepository) {}

  async upload(userId: string, filename: string) {
    return await this.userRepository.updateAvatar(userId, filename);
  }

  async get(filename: string): Promise<string | null> {
    const filePath = path.resolve(__dirname, '..', '..', 'uploads', 'avatars', filename);

    return fs.existsSync(filePath) ? filePath : null;
  }

  async delete(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user || !user.avatar) throw new ResourceNotFoundError();

    const filePath = path.resolve(__dirname, '..', '..', 'uploads', 'avatars', user.avatar);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.userRepository.removeAvatar(userId);
  }
}
