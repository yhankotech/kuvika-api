-- CreateTable
CREATE TABLE "ServiceRequest" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "serviceDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT,
    "clientId" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "isFromClient" BOOLEAN NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClientMessages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClientMessages_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_WorkerMessages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_WorkerMessages_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_clientId_workerId_key" ON "Favorite"("clientId", "workerId");

-- CreateIndex
CREATE INDEX "_ClientMessages_B_index" ON "_ClientMessages"("B");

-- CreateIndex
CREATE INDEX "_WorkerMessages_B_index" ON "_WorkerMessages"("B");

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "fk_sender_client" FOREIGN KEY ("senderId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "fk_sender_worker" FOREIGN KEY ("senderId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "fk_recipient_client" FOREIGN KEY ("recipientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "fk_recipient_worker" FOREIGN KEY ("recipientId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientMessages" ADD CONSTRAINT "_ClientMessages_A_fkey" FOREIGN KEY ("A") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientMessages" ADD CONSTRAINT "_ClientMessages_B_fkey" FOREIGN KEY ("B") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkerMessages" ADD CONSTRAINT "_WorkerMessages_A_fkey" FOREIGN KEY ("A") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkerMessages" ADD CONSTRAINT "_WorkerMessages_B_fkey" FOREIGN KEY ("B") REFERENCES "Worker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
