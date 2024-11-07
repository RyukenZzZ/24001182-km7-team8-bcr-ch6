const modelService = require("../services/models");
const { successResponse } = require("../utils/response");

exports.getModels = async (req, res, next) => {
  const data = await modelService.getModels(req.query?.name);
  successResponse(res, data);
};

exports.getModelById = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelService.getModelById(id);
  successResponse(res, data, "Model found successfully.");
};

exports.createModel = async (req, res, next) => {
  const data = await modelService.createModel(req.body);
  successResponse(res, data, "Model successfully added!");
};

exports.updateModel = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelService.updateModel(id, req.body);
  successResponse(res, data, "Model successfully updated!");
};

exports.deleteModelById = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelService.deleteModelById(id);
  successResponse(res, data, "Model successfully deleted!");
};
