const Joi = require('@hapi/joi');

export default class ReportValidator {
    static validateReport = data => {
        const schema = Joi.object({
            groupDescription: Joi.string().required(),
            groupID: Joi.string().required(),
            groupName: Joi.string().required(),
            taskID: Joi.string().required()
        });
    
        return schema.validate(data);
    }

    static validateReportToRate = data => {
        const schema = Joi.object({
            rating: Joi.number().required(),
            reportID: Joi.string().required(),
            taskID: Joi.string().required(),
            evaluatorDescription: Joi.string().empty(''),
            evaluatorName: Joi.string().required()
        });
    
        return schema.validate(data);
    }
} 