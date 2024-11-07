const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB
const JSONBigInt = require(`json-bigint`);

exports.getCarsType = async () => {
  const carsTypeData = await prisma.types.findMany();
  if (!carsTypeData) {
    return null;
  }
  const serializeData = JSONBigInt.stringify(carsTypeData);
  return JSONBigInt.parse(serializeData);
};

exports.getCarsTypeById = async (id) => {
  const carsTypeData = await prisma.types.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!carsTypeData) {
    return null;
  }
  const serializeData = JSONBigInt.stringify(carsTypeData);
  return JSONBigInt.parse(serializeData);
};

exports.getCarsTypeByQuery = async (name, characteristic, style) => {
  const carsTypeData = await prisma.types.findMany({
    where: {
      OR: [
        {
          name: {
            contains: name,
            mode: "insensitive",
          },
          characteristic: {
            contains: characteristic,
            mode: "insensitive",
          },
          style: {
            contains: style,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  if (!carsTypeData) {
    return null;
  }
  const serializeData = JSONBigInt.stringify(carsTypeData);
  return JSONBigInt.parse(serializeData);
};

exports.addCarsType=async(data)=>{
  const newCarsType = await prisma.types.createManyAndReturn({
    data:[{...data}]
  });
  const serializeData = JSONBigInt.stringify(newCarsType);
  return JSONBigInt.parse(serializeData);
}

exports.updateCarsType=async(id,data)=>{
  const updatedCarsType = await prisma.types.update({
    where: {
      id:Number(id),
    },
    data,
  });
  const serializeData=JSONBigInt.stringify(updatedCarsType);
  return JSONBigInt.parse(serializeData);
}

exports.deleteCarsType=async(id)=>{
  const deletedCarsType = await prisma.types.delete({
    where: {
      id:Number(id),
    },
  });
  const serializeData=JSONBigInt.stringify(deletedCarsType);
  return JSONBigInt.parse(serializeData);
}