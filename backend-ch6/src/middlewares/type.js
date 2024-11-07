const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

const validateParams = z.string();

exports.validateGetParamsCarsType = (req, res, next) => {
  const resultValidateParams = validateParams.safeParse(req.params.id);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  next();
};

exports.validatePostCarsType = (req, res, next) => {
  const validateBody = z.object({
    name:z.string(),
    description:z.string(),
    characteristic:z.string().optional().nullable(),
    style:z.string().optional().nullable(),
  });
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  next();
};

exports.validatePutCarsType = (req, res, next) => {
  const validateUpdateBody = z.object({
    name: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    characteristic: z.string().optional().nullable(),
    style: z.string().optional().nullable(),
  });

  const resultValidateParams = validateParams.safeParse(req.params.id);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  const resultValidateBody = validateUpdateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  next();
};

exports.validateGetQueryType = (req, res, next) => {
  const validateQuery = z
    .object({
      name: z.string().optional().nullable(),
      characteristic: z.string().optional().nullable(),
      style: z.string().optional().nullable(),
    })
    .optional()
    .nullable();

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if(!resultValidateQuery.success){
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};
