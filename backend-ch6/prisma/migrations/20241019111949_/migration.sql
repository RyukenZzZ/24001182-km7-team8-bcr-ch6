-- CreateTable
CREATE TABLE "cars" (
    "id" BIGSERIAL NOT NULL,
    "plate" VARCHAR(255),
    "manufacture_id" BIGINT,
    "model_id" BIGINT,
    "image" TEXT,
    "rentPerDay" INTEGER,
    "capacity" INTEGER,
    "description" TEXT,
    "availableAt" DATE,
    "transmission" VARCHAR(255),
    "available" BOOLEAN,
    "type_id" BIGINT,
    "year" INTEGER,
    "options" TEXT[],
    "specs" TEXT[],

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manufactures" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255),
    "logo" TEXT,

    CONSTRAINT "manufactures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "models" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255),
    "description" TEXT,
    "manufacture_id" BIGINT,

    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255),
    "description" TEXT,
    "characteristic" TEXT,
    "style" VARCHAR(255),

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_manufacture_id_fkey" FOREIGN KEY ("manufacture_id") REFERENCES "manufactures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_manufacture_id_fkey" FOREIGN KEY ("manufacture_id") REFERENCES "manufactures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
