import { Sequelize } from "sequelize"
import db from "../models"
import ResponseUser from "../dtos/responses/user/ResponseUser"
import AddUserRequest from "../dtos/requests/user/AddUserRequest"
import argon2 from "argon2"

const { Op } = Sequelize

export async function addUser(req, res) {
    const existingUser = await db.User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(existingUser) {
        return res.status(409).json({
            message: "Email existed!"
        })
    }

    const hashedPassword = await argon2.hash(req.body.password)
    const user = await db.User.create({...req.body, password: hashedPassword}) // ...req.body: duplicate req.body so that we do not modify input values

    return res.status(201).json({
        message: "Create new user successfully!",
        data: new ResponseUser(user)
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