const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const { NotFoundError } = require("../utils/request");

const prisma = new PrismaClient();

exports.getModels = async (name) => {
  const query = {
    include: {
      manufactures: true,
    },
  };

  if (name) {
    query.where = {
      name: { contains: name, mode: "insensitive" },
    };
  }

  const models = await prisma.models.findMany(query);
  const serializedModels = JSONBigInt.stringify(models);
  return JSONBigInt.parse(serializedModels);
};

exports.getModelById = async (id) => {
  const model = await prisma.models.findUnique({
    where: { id },
    include: {
      manufactures: true,
    },
  });
  const serializedModels = JSONBigInt.stringify(model);
  return JSONBigInt.parse(serializedModels);
};

exports.createModel = async (data) => {
  const {manufacture_id} = data;

  // Check if related IDs exist
  const manufacture = await prisma.manufactures.findUnique({ where: { id: manufacture_id } });
  if (!manufacture) throw new NotFoundError(`Manufacture with ID ${manufacture_id} not found`);


  const newModel = await prisma.models.create({
    data,
    include: {
      manufactures: true,
    },
  });
  const serializedModels = JSONBigInt.stringify(newModel);
  return JSONBigInt.parse(serializedModels);
};

exports.updateModel = async (id, data) => {
  const {manufacture_id} = data;

  // Check if related IDs exist
  const manufacture = await prisma.manufactures.findUnique({ where: { id: manufacture_id } });
  if (!manufacture) throw new NotFoundError(`Manufacture with ID ${manufacture_id} not found`);

  const updatedModel = await prisma.models.update({
    where: { id },
    data,
    include: {
      manufactures: true,
    },
  });
  const serializedModels = JSONBigInt.stringify(updatedModel);
  return JSONBigInt.parse(serializedModels);
};

exports.deleteModelById = async (id) => {
  const deletedModel = await prisma.models.delete({
    where: { id },
    include: {
      manufactures: true,
    },
  });
  const serializedModels = JSONBigInt.stringify(deletedModel);
  return JSONBigInt.parse(serializedModels);
};
