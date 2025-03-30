import Joi from "joi"

class AddUserRequest {
    constructor(data) {
        this.email = data.email
        this.password = data.password
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.role = data.role
        this.avatar = data.avatar
        this.phone = data.phone
    }

    static validate(data) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            role: Joi.number().integer().min(1).required(),
            avatar: Joi.string().uri().allow('').optional(),
            phone: Joi.string().optional()
        })

        return schema.validate(data) // return {error, value}
    }
}

export default AddUserRequest