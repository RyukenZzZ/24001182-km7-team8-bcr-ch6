const manufactureRepository = require("../repositories/manufactures");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError } = require ("../utils/request");

exports.getManufactures = async (req) => {
  return Object.keys(req.query).length
    ? await manufactureRepository.getManufacturesByQuery(
        req.query.name,
      )
    : await manufactureRepository.getManufactures();
};

exports.getManufactureById = async (id) => {
  return await manufactureRepository.getManufactureById(id);
};

exports.createManufacture = async (data, file) => {
  if (file?.logo) {
    data.logo = await imageUpload(file.logo);
  }
  return await manufactureRepository.createManufacture(data);
};

exports.updateManufacture = async (id, data, file) => {
  const existingManufacture = await manufactureRepository.getManufactureById(id);
  if (!existingManufacture) {
    throw new NotFoundError("Manufacture not found!");
  }

  if (file?.logo) {
    data.logo = await imageUpload(file.logo);
  }
  return await manufactureRepository.updateManufacture(id, data);
};

exports.deleteManufactureById = async (id) => {
  const existingManufacture = await manufactureRepository.getManufactureById(id);
  if (!existingManufacture) {
    throw new NotFoundError("Manufacture not found!");
  }
  
  return await manufactureRepository.deleteManufactureById(id);
};
