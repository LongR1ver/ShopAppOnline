import Joi from "joi";

class AddNewsRequest {
    constructor(data) {
        this.title = data.title
        this.image = data.image
        this.content = data.content
        this.productIds = data.productIds
    }

    static validate(data) {
        const schema = Joi.object({
            title: Joi.string().required(),
            image: Joi.string().uri().allow('', null),
            content: Joi.string().required(''),
            productIds: Joi.array().items(Joi.number().integer()).optional()
        })

        return schema.validate(data) // return {error, value}
    }
}

export default AddNewsRequest