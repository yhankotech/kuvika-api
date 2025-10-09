import { Prisma } from "@prisma/client";

export type ServiceWithRelations = Prisma.ServiceRequestGetPayload<{
  include: {
    client: {
      select: { email: true; fullName: true };
    };
    worker: {
      select: { fullName: true };
    };
  };
}>;