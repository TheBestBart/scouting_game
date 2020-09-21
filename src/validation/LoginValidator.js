const Joi = require('@hapi/joi');

export default class LoginValidator {
    static validateLogin = data => {
        const schema = Joi.object({
            login: Joi.string().required(),
            password: Joi.string().required()
        });
    
        return schema.validate(data);
    }
} 