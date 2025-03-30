import { Sequelize } from "sequelize"
import db from "../models"

const { Op } = Sequelize

export async function addUser(req, res) {
    const user = await db.User.create(req.body)

    return res.status(201).json({
        message: "Create new user successfully!",
        data: user
    })
}

export async function updateUser(req, res) {
    const { id } = req.params
    const updatedUser = await db.User.update(req.body, {
        where: id
    })

    if(updatedUser) {
        return res.status(200).json({
            message: "Updated user successfully!"
        })
    } else {
        return res.status(404).json({
            message: "User not found!"
        })
    }
}