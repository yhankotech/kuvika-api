
import { Router } from 'express';
import { workerRoutes } from '@/http/routes/worker.routes';
import { clientRoutes } from "@/http/routes/client.routes";
import { serviceRoutes } from "@/http/routes/service.routes";
import { ratingRoutes } from "@/http/routes/rating.routes";
import { favoriteRoutes } from "@/http/routes/favorite.routes";
import { uploadClientPhotoRoute } from "@/http/routes/uploadClientPhoto.routes";
import { uploadWorkerPhotoRoute } from "@/http/routes/uploadeWorkerPhoto.routes";
import { messageRoutes } from "@/http/routes/message.routes";

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