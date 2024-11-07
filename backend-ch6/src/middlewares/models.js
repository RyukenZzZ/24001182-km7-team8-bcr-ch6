const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetModels = (req, res, next) => {
  const validateQuery = z.object({
    name: z.string().optional().nullable(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

exports.validateGetModelById = (req, res, next) => {
  req.params = { ...req.params, id: Number(req.params.id) };

  const validateParams = z.object({
    id: z.number(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateCreateModel = (req, res, next) => {
  const validateBody = z.object({
    name: z.string(),
    description: z.string(),
    manufacture_id: z.string(), // Ensure this matches your DB schema
  });

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateUpdateModel = (req, res, next) => {
  req.params = { ...req.params, id: Number(req.params.id) };

  const validateParams = z.object({
    id: z.number(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  const validateBody = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    manufacture_id: z.string().optional(), // Ensure this matches your DB schema
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

exports.validateDeleteModelById = (req, res, next) => {
  req.params = { ...req.params, id: Number(req.params.id) };

  const validateParams = z.object({
    id: z.number(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
