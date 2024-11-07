const modelRepository = require("../repositories/models");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getModels = async (name) => {
  const models = await modelRepository.getModels(name);
  if (models.length === 0) {
    throw new NotFoundError("No models found with the given criteria!");
  }
  return models;
};

exports.getModelById = async (id) => {
  const model = await modelRepository.getModelById(id);
  if (!model) {
    throw new NotFoundError("Model not found!");
  }
  return model;
};

exports.createModel = async (data) => {
  return modelRepository.createModel(data);
};

exports.updateModel = async (id, data) => {
  const existingModel = await modelRepository.getModelById(id);
  if (!existingModel) {
    throw new NotFoundError("Model not found!");
  }

  const updatedModel = await modelRepository.updateModel(id, data);
  if (!updatedModel) {
    throw new InternalServerError("Failed to update the model!");
  }

  return updatedModel;
};

exports.deleteModelById = async (id) => {
  const existingModel = await modelRepository.getModelById(id);
  if (!existingModel) {
    throw new NotFoundError("Model not found!");
  }

  const deletedModel = await modelRepository.deleteModelById(id);
  if (!deletedModel) {
    throw new InternalServerError("Failed to delete the model!");
  }

  return deletedModel;
};
