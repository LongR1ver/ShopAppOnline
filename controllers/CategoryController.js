import { Sequelize } from "sequelize"
import db from "../models"

export async function addCategory(req, res) {
    try {
        const category = await db.Category.create(req.body)

        return res.status(201).json({
            message: "Add category successfully!",
            data: category
        })
    } catch(error) {
        return res.status(500).json({
            message: "Error occurs when adding category",
            error: error.message
        })
    }
}

export async function getAllCategories(req, res) {
    res.status(200).json({
        message: "Get all categories successfully!"
    })
}

export async function getCategoryByID(req, res) {
    res.status(200).json({
        message: "Get category by ID successfully!"
    })
}

export async function updateCategory(req, res) {
    res.status(200).json({
        message: "Update category successfully!"
    })
}

export async function deleteCategory(req, res) {
    res.status(200).json({
        message: "Delete category successfully!"
    })
}