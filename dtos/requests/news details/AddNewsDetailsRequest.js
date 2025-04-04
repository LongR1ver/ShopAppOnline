import Joi from "joi";

class AddNewsDetailsRequest {
    constructor(data) {
        this.productId = data.productId
        this.newsId = data.newsId
    }

    static validate(data) {
        const schema = Joi.object({
            productId: Joi.number().integer().required(),
            newsId: Joi.number().integer().required()
        })

        return schema.validate(data) // return {error, value}
    }
}

export default AddNewsDetailsRequest