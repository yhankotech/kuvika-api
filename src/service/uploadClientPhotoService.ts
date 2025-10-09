import { UploadClientRepository } from '@/domain/repositories/uploadClientRepository';
import { AppError } from '@/shared/errors/error';

export class ManageClientAvatarUseCase {
  constructor(private userRepository: UploadClientRepository) {}

  async upload({ userId, filename }: { userId: string; filename: string | undefined }) {
    return await this.userRepository.updateAvatar(userId, filename);
  }

  async delete(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user || !user.avatar) throw new AppError("Usuário não encontrado !", 404);


    await this.userRepository.removeAvatar(userId);
  }

  async getById(userId: string) {
    return await this.userRepository.findById(userId);
  }
}