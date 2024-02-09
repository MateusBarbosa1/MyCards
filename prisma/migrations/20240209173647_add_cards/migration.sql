-- CreateTable
CREATE TABLE "Cards" (
    "id_cards" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id_cards")
);
