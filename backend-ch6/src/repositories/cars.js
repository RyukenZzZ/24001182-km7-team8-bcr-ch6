const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JSONBigInt = require("json-bigint");
const { NotFoundError } = require("../utils/request");

exports.getCars = async () => {
  const carsData = await prisma.cars.findMany({
    include: { manufactures: true, models: true, types: true },
  });
  return JSONBigInt.parse(JSONBigInt.stringify(carsData));
};

exports.getCarsByQuery = async (plate, manufacture_id, model_id, type_id) => {
  const searchedCars = await prisma.cars.findMany({
    where: {
      OR: [
        {
          plate: {
            contains: plate,
            mode: "insensitive",
          },
          manufacture_id,
          model_id,
          type_id,
        },
      ],
    },
  });
  return JSONBigInt.parse(JSONBigInt.stringify(searchedCars));
};

exports.getCarsById = async (id) => {
  const carsById = await prisma.cars.findUnique({
    where: {
      id: id,
    },
    include: { manufactures: true, models: true, types: true },
  });
  return JSONBigInt.parse(JSONBigInt.stringify(carsById));
};

exports.addCars = async (data) => {
  const { manufacture_id, model_id, type_id } = data;

  // Check if related IDs exist
  const manufacture = await prisma.manufactures.findUnique({
    where: { id: manufacture_id },
  });
  const model = await prisma.models.findUnique({ where: { id: model_id } });
  const type = await prisma.types.findUnique({ where: { id: type_id } });

  if (!manufacture)
    throw new NotFoundError(`Manufacture with ID ${manufacture_id} not found`);
  if (!model) throw new NotFoundError(`Model with ID ${model_id} not found`);
  if (!type) throw new NotFoundError(`Type with ID ${type_id} not found`);

  const newCars = await prisma.cars.create({
    data,
  });
  return JSONBigInt.parse(JSONBigInt.stringify(newCars));
};

exports.updateCars = async (id, data) => {
  const { manufacture_id, model_id, type_id } = data;

  // Check if related IDs exist
  const manufacture = await prisma.manufactures.findUnique({
    where: { id: manufacture_id },
  });
  const model = await prisma.models.findUnique({ where: { id: model_id } });
  const type = await prisma.types.findUnique({ where: { id: type_id } });

  if (!manufacture)
    throw new NotFoundError(`Manufacture with ID ${manufacture_id} not found`);
  if (!model) throw new NotFoundError(`Model with ID ${model_id} not found`);
  if (!type) throw new NotFoundError(`Type with ID ${type_id} not found`);

  const updatedCars = await prisma.cars.update({
    where: { id: Number(id) },
    data,
  });
  return JSONBigInt.parse(JSONBigInt.stringify(updatedCars));
};

exports.deleteCars = async (id) => {
  const deletedCars = await prisma.cars.delete({
    where: {
      id: Number(id),
    },
  });
  return JSONBigInt.parse(JSONBigInt.stringify(deletedCars));
};
