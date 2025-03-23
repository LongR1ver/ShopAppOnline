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