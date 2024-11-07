const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

const validateParams = z.string();
const validatePicture = z
  .object({
    image: z
      .object({
        data: z.any(),
        name: z.string(),
      })
      .optional()
      .nullable(),
  })
  .optional()
  .nullable();

exports.validateGetParams = (req, res, next) => {
  const resultValidateParams = validateParams.safeParse(req.params.id);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  next();
};

exports.validatePostCars = (req, res, next) => {
  req.parsedBody = {
    ...req.body,
    manufacture_id: Number(req.body.manufacture_id),
    model_id: Number(req.body.model_id),
    type_id: Number(req.body.type_id),
    availableAt: new Date(req.body.availableAt),
    available: req.body.available === "true",
    rentPerDay: Number(req.body.rentPerDay),
    capacity: Number(req.body.capacity),
    year: Number(req.body.year),
    options: req.body.options
      ? req.body.options.split(",").map((opt) => opt.trim())
      : [],
    specs: req.body.specs
      ? req.body.specs.split(",").map((spec) => spec.trim())
      : [],
  };

  const validateBody = z.object({
    plate: z.string(),
    manufacture_id: z.number(),
    model_id: z.number(),
    rentPerDay: z.number(),
    capacity: z.number(),
    description: z.string(),
    availableAt: z.date(),
    transmission: z.string(),
    available: z.boolean(),
    type_id: z.number(),
    year: z.number(),
    options: z.array(z.string()).optional(),
    specs: z.array(z.string()).optional(),
  });

  const resultValidateBody = validateBody.safeParse(req.parsedBody);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  const resultValidatePicture = validatePicture.safeParse(req.files);
  if (!resultValidatePicture.success) {
    throw new BadRequestError(resultValidatePicture.error.errors);
  }

  next();
};

exports.validatePutCars = (req, res, next) => {
  const manufacture_id = Number(req.body.manufacture_id);
  const model_id = Number(req.body.model_id);
  const type_id = Number(req.body.type_id);
  const available = req.body.available === "true";
  const availableAt = new Date(req.body.availableAt);
  const rentPerDay = Number(req.body.rentPerDay);
  const capacity = Number(req.body.capacity);
  const year = Number(req.body.year);

  req.parsedBody = {
    ...req.body,
    available: available,
    ...(manufacture_id && { manufacture_id }),
    ...(model_id && { model_id }),
    ...(type_id && { type_id }),
    ...(availableAt && { availableAt }),
    ...(rentPerDay && { rentPerDay }),
    ...(capacity && { capacity }),
    ...(year && { year }),
    options: req.body.options
      ? req.body.options.split(",").map((opt) => opt.trim())
      : [],
    specs: req.body.specs
      ? req.body.specs.split(",").map((spec) => spec.trim())
      : [],
  };

  const validateUpdateBody = z.object({
    plate: z.string().optional().nullable(),
    manufacture_id: z.number().optional().nullable(),
    model_id: z.number().optional().nullable(),
    rentPerDay: z.number().optional().nullable(),
    capacity: z.number().optional().nullable(),
    description: z.string().optional().nullable(),
    availableAt: z.date().optional().nullable(),
    transmission: z.string().optional().nullable(),
    available: z.boolean().optional().nullable(),
    type_id: z.number().optional().nullable(),
    year: z.number().optional().nullable(),
    options: z.array(z.string()).optional(),
    specs: z.array(z.string()).optional(),
  });

  const resultValidateParams = validateParams.safeParse(req.params.id);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  const resultValidateBody = validateUpdateBody.safeParse(req.parsedBody);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  const resultValidatePicture = validatePicture.safeParse(req.files);
  if (!resultValidatePicture.success) {
    throw new BadRequestError(resultValidatePicture.error.errors);
  }
  next();
};

exports.validateGetQuery = (req, res, next) => {
  const validateQuery = z
    .object({
      plate: z.string().optional().nullable(),
      manufacture: z.string().optional().nullable(),
    })
    .optional()
    .nullable();

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};
