import Joi from "joi";

class InsertProductRequest {
    constructor(data) {
        this.name = data.name
        this.price = data.price
        this.oldPrice = data.oldPrice
        this.image = data.image
        this.description = data.description
        this.specification = data.specification
        this.buyturn = data.buyturn
        this.quantity = data.quantity
        this.brandId = data.brandId
        this.categoryId = data.categoryId
    }

    static validate(data) {
        const schema = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().positive().required(),
            oldPrice: Joi.number().positive(),
            image: Joi.string().uri().allow(""),
            description: Joi.string().optional(),
            specification: Joi.string().required(),
            buyturn: Joi.number().integer().min(0),
            quantity: Joi.number().integer().min(0),
            brandId: Joi.number().integer().required(),
            categoryId: Joi.number().integer().required()
        })

        return schema.validate(data) // return {error, value}
    }
}

export default InsertProductRequest