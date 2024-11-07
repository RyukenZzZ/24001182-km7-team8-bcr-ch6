const carsTypeService = require("../services/type");
const { successResponse } = require("../utils/response");
const { NotFoundError } = require("../utils/request");

exports.getCarsType = async (req, res, next) => {
  const data = await carsTypeService.getCarsType(req);
  if (!data.length) {
    throw new NotFoundError(`Cars type not found`);
  }
  successResponse(res, data, `Successfully fetched cars type`);
};

exports.getCarsTypeById = async (req, res, next) => {
  const data = await carsTypeService.getCarsTypeById(req.params.id);
  if (!data) {
    throw new NotFoundError(`Cars Type not found`);
  }
  successResponse(res, data, `Successfully fetched cars type`);
};

exports.addCarsType = async (req, res, next) => {
  const data = await carsTypeService.addCarsType(req.body);
  successResponse(res, data, `Successfully added cars type`);
};

exports.updateCarsType = async (req, res, next) => {
  const data = await carsTypeService.updateCarsType(
    req.params.id,
    req.body
  );
  if (!data) {
    throw new NotFoundError(`Type id not found`);
  }
  successResponse(res, data, `Successfully updated cars type`);
};

exports.deleteCarsType =async (req, res, next) => {
  const data = await carsTypeService.deleteCarsType(req.params.id);
  if (!data) {
    throw new NotFoundError(`Type id not found`);
  }
  successResponse(res, data, `Successfully deleted cars type`);
};
