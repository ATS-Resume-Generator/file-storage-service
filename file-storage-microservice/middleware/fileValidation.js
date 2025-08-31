const Joi = require('joi');

const fileValidationSchema = Joi.object({
    file: Joi.object({
        name: Joi.string().required(),
        type: Joi.string().valid('application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/json').required(),
        size: Joi.number().max(10 * 1024 * 1024).required() // Limit to 10MB
    }).required()
});

const validateFile = (req, res, next) => {
    const { error } = fileValidationSchema.validate(req.file);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = validateFile;