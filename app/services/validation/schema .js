const Joi = require("joi").extend(require("@joi/date"));

//Validate register
const registerSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  surname: Joi.string().allow(""),
  email: Joi.string(),
  password: Joi.string().min(8),
  birthdate: Joi.date().format("YYYY-MM-DD"),
  img_url: Joi.string().allow(""),
  unique_code: Joi.string().allow(""),
})
  .required()
  .min(6);

const loginSchema = Joi.object({
  email: Joi.string(),
  password: Joi.string(),
  unique_code: Joi.string().allow(""),
})
  .required()
  .min(2);

const patchUserSchema = Joi.object({
  firstname: Joi.string().allow(""),
  lastname: Joi.string().allow(""),
  surname: Joi.string().allow(""),
  email: Joi.string().allow(""),
  password: Joi.string().min(8).allow(""),
  newpassword: Joi.string().allow(""),
  birthdate: Joi.date().format("YYYY-MM-DD").allow(""),
  img_url: Joi.string().allow(""),
})
  .required()
  .min(1)
  .max(8);

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
  unique_code: Joi.string(),
})
  .required()
  .min(1);

const updateCircleSchema = Joi.object({
  name: Joi.string().allow(""),
  description: Joi.string().allow(""),
  color: Joi.string().allow(""),
  img_url: Joi.string().allow(""),
  user_id: Joi.number(),
})
  .required()
  .min(2)
  .max(5);

const createEventSchema = Joi.object({
  title: Joi.string(),
  start: Joi.date(),
  end: Joi.date(),
  description: Joi.string(),
  allday: Joi.boolean(),
  color: Joi.string(),
  user_id: Joi.number().integer(),
})
  .required()
  .min(7);

const patchEventSchema = Joi.object({
  title: Joi.string(),
  start: Joi.date().allow(""),
  end: Joi.date().allow(""),
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
