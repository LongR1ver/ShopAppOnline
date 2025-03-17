import { Sequelize } from "sequelize"
import db from "../models"
import InsertProductRequest from "../dtos/requests/InsertProductRequest"

export async function addProduct(req, res) {
    const {error} = InsertProductRequest.validate(req.body)

    if (error) {
        return res.status(400).json({
            message: "Error occurs when adding product",
            error: error.details[0]?.message
        })
    }

    try {
        const product = await db.Product.create(req.body)

        return res.status(201).json({
            message: "Add product successfully!",
            data: product
        })
    } catch(error) {
        return res.status(500).json({
            message: "Error occurs when adding product",
            error: error.errors[0]?.message
        })
    }
}

export async function getAllProducts(req, res) {
    res.status(200).json({
        message: "Get all products successfully!"
    })
}

export async function getProductByID(req, res) {
    res.status(200).json({
        message: "Get product by ID successfully!"
    })
}

export async function updateProduct(req, res) {
    res.status(200).json({
        message: "Update product successfully!"
    })
}

export async function deleteProduct(req, res) {
    res.status(200).json({
        message: "Delete product successfully!"
    })
}