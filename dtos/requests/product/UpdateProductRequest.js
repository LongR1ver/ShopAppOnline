import Joi from "joi"

class UpdateProductRequest {
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
            name: Joi.string().optional(),
            price: Joi.number().positive().optional(),
            oldPrice: Joi.number().positive().optional(),
            image: Joi.string().uri().allow("").optional(),
            description: Joi.string().optional(),
            specification: Joi.string().optional(),
            buyturn: Joi.number().integer().min(0).optional(),
            quantity: Joi.number().integer().min(0).optional(),
            brandId: Joi.number().integer().optional(),
            categoryId: Joi.number().integer().optional()
        })

        return schema.validate(data) // return {error, value}
    }
}

export default UpdateProductRequest