const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

// Common validation for ID parameters
const validateId = z.string();

// Common validation for query parameters
const validateQuery = z
  .object({
    name: z.string().optional().nullable(),
  })
  .optional()
  .nullable();

// Validate request to get manufactures
exports.validateGetManufactures = (req, res, next) => {
  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};

// Validate request to get manufacture by ID
exports.validateGetManufactureById = (req, res, next) => {
  const resultValidateParams = validateId.safeParse(req.params.id);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  next();
};

// Validate request to create a manufacture
exports.validateCreateManufacture = (req, res, next) => {
  const schema = z.object({
    logo: z.string().optional(),
    name: z.string().min(1, "Manufacture name is required"),
  });

  if (!req.files || !req.files.logo) {
    throw new BadRequestError("Logo file is required");
  }

  const result = schema.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

// Validate request to update manufacture
exports.validateUpdateManufacture = (req, res, next) => {
  const resultValidateParams = validateId.safeParse(req.params.id);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  const schema = z.object({
    name: z.string().optional(),
    logo: z.string().optional(),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

// Validate request to delete manufacture by ID
exports.validateDeleteManufactureById = (req, res, next) => {
  const result = validateId.safeParse(req.params.id);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
