-- CreateTable
CREATE TABLE "Cards" (
    "id_cards" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id_cards")
);
