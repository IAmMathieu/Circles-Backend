const { default: JoiDateFactory } = require("@joi/date");

const Joi = require("joi").extend(require("@joi/date"));

//Validate register
const registerSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string(),
  password: Joi.string().length().min(8),
  birthdate: Joi.date().format("YYYY-MM-DD"),
  img_url: Joi.string(),
})
  .required()
  .min(6);

const loginSchema = Joi.object({
  email: Joi.string(),
  password: Joi.string(),
})
  .required()
  .min(2);

const patchUserSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string(),
  password: Joi.string().min(8),
  oldpassword: Joi.string(),
  birthdate: Joi.date().format("YYYY-MM-DD"),
  img_url: Joi.string().allow(""),
})
  .required()
  .min(1)
  .max(7);

const createCircleSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  color: Joi.string(),
  img_url: Joi.string().allow(""),
  user_id: Joi.number().integer(),
})
  .required()
  .min(5);

const addUserToCircle = Joi.object({
  unique_code: Joi.string().min(8).max(8),
})
  .required()
  .min(1);

const updateCircleSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  color: Joi.string(),
  img_url: Joi.string().allow(""),
})
  .required()
  .min(1)
  .max(7);

const createEventSchema = Joi.object({
  title: Joi.string(),
  start: Joi.date().format("YYYY-MM-DD"),
  end: Joi.date().format("YYYY-MM-DD"),
  description: Joi.string(),
  allday: Joi.boolean(),
  color: Joi.string(),
  user_id: Joi.number().integer(),
})
  .required()
  .min(7);

const patchEventSchema = Joi.object({
  title: Joi.string(),
  start: Joi.date().format("YYYY-MM-DD"),
  end: Joi.date().format("YYYY-MM-DD"),
  description: Joi.string(),
  allday: Joi.boolean(),
  color: Joi.string(),
  user_id: Joi.number().integer(),
})
  .required()
  .min(1)
  .max(7);

module.exports = {
  registerSchema,
  loginSchema,
  patchUserSchema,
  createCircleSchema,
  addUserToCircle,
  updateCircleSchema,
  createEventSchema,
  patchEventSchema,
};
