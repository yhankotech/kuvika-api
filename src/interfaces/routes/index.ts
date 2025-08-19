
import { Router } from 'express';
import { workerRoutes } from '@/interfaces/routes/worker.routes';
import { clientRoutes } from "@/interfaces/routes/client.routes";
import { serviceRoutes } from "@/interfaces/routes/service.routes";
import { ratingRoutes } from "@/interfaces/routes/rating.routes";
import { favoriteRoutes } from "@/interfaces/routes/favorite.routes";
import { uploadClientPhotoRoute } from "@/interfaces/routes/uploadClientPhoto.routes";
import { uploadWorkerPhotoRoute } from "@/interfaces/routes/uploadeWorkerPhoto.routes";
import { messageRoutes } from "@/interfaces/routes/message.routes";

export const router = Router();

router.use('/workers', workerRoutes);
router.use('/clients', clientRoutes);
router.use('/service', serviceRoutes);
router.use('/ratings', ratingRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/client', uploadClientPhotoRoute);
router.use('/worker', uploadWorkerPhotoRoute);
router.use('/messages', messageRoutes);

router.use('/api/v1', router);