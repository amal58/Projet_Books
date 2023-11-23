const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  lastname: Joi.string().required(),
  firstname: Joi.string().required(),
  role: Joi.string().valid('admin', 'user').default('user'),
});

const validateSignup = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.body = value; 
  next();
};

module.exports = validateSignup;
