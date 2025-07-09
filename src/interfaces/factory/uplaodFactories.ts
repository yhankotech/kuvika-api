import { PrismaClientRepository } from '../../infra/repositories/uploadPhotoRepository';
import { ManageClientAvatarUseCase } from '../../aplication/service/uploadClientPhotoService';

import { PrismaWorkerRepository } from '../../infra/repositories/uplaodWorkerPhotoRepository';
import { ManageWorkerAvatarUseCase } from '../../aplication/service/uploadWorkerPhotoService';

export function makeClientService() {
  const repo = new PrismaClientRepository();
  return new ManageClientAvatarUseCase(repo);
}

export function makeWorkerService() {
  const repo = new PrismaWorkerRepository();
  return new ManageWorkerAvatarUseCase(repo);
}