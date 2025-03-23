import Joi from "joi";

class AddOrderRequest {
    constructor(data) {
        this.userId = data.userId
        this.status = data.status
        this.note = data.note
        this.total = data.total
    }

    static validate(data) {
        const schema = Joi.object({
            userId: Joi.number().integer().required(),
            status: Joi.number().integer().min(1).required(),
            note: Joi.string().optional().allow(''),
            total: Joi.number().min(0).required()
        })

        return schema.validate(data) // return {error, value}
    }
}

export default AddOrderRequest