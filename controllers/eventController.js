const { Event, eventValidationSchema } = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
  
    const { error, value } = eventValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const event = new Event(value);

    
    const savedEvent = await event.save();

    res.status(201).json({
      model: savedEvent,
      message: 'Événement créé avec succès',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
