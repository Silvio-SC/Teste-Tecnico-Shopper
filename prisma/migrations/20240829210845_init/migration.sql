-- CreateEnum
CREATE TYPE "Type" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "meansure" (
    "id" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "type" "Type" NOT NULL,
    "value" INTEGER NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "customer_code" TEXT NOT NULL,

    CONSTRAINT "meansure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "meansure" ADD CONSTRAINT "meansure_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
