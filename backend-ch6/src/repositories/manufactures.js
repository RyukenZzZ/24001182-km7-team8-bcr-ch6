const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JSONBigInt = require("json-bigint");

// Fetch all manufactures
exports.getManufactures = async () => {
  const manufacturesData = await prisma.manufactures.findMany();
  if (!manufacturesData) {
    return null;
  }
  const serializedData = JSONBigInt.stringify(manufacturesData);
  return JSONBigInt.parse(serializedData);
};

// Fetch manufacture by ID
exports.getManufactureById = async (id) => {
  const manufactureData = await prisma.manufactures.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!manufactureData) {
    return null;
  }
  const serializedData = JSONBigInt.stringify(manufactureData);
  return JSONBigInt.parse(serializedData);
};

exports.getManufacturesByQuery = async (name) => {
  const carsManufactureData = await prisma.manufactures.findMany({
    where: {
      OR: [
        {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  if (!carsManufactureData) {
    return null;
  }
  const serializeData = JSONBigInt.stringify(carsManufactureData);
  return JSONBigInt.parse(serializeData);
};

// Create a new manufacture
exports.createManufacture = async (data) => {
  const newManufacture = await prisma.manufactures.create({
    data,
  });
  const serializedData = JSONBigInt.stringify(newManufacture);
  return JSONBigInt.parse(serializedData);
};

// Update manufacture by ID
exports.updateManufacture = async (id, data) => {
  const updatedManufacture = await prisma.manufactures.update({
    where: {
      id: Number(id),
    },
    data,
  });
  const serializedData = JSONBigInt.stringify(updatedManufacture);
  return JSONBigInt.parse(serializedData);
};

// Delete manufacture by ID
exports.deleteManufactureById = async (id) => {
  const deletedManufacture = await prisma.manufactures.delete({
    where: {
      id: Number(id),
    },
  });
  const serializedData = JSONBigInt.stringify(deletedManufacture);
  return JSONBigInt.parse(serializedData);
};
