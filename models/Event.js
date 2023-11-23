const mongoose = require('mongoose');
const Joi = require('joi');

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const eventValidationSchema = Joi.object({
  title: Joi.string().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
});

const Event = mongoose.model('Event', eventSchema);

module.exports = { Event, eventValidationSchema };
