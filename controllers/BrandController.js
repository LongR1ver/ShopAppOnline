import { Sequelize } from "sequelize"
import db from "../models"

export async function addBrand(req, res) {
    try {
        const brand = await db.Brand.create(req.body)

        res.status(201).json({
            message: "Add brand successfully!",
            data: brand
        })
    } catch(error) {
        res.status(500).json({
            message: "Error occurs when adding brand",
            error: error.message
        })
    }
}

export async function getAllBrands(req, res) {
    res.status(200).json({
        message: "Get all brands successfully!"
    });
}

export async function getBrandByID(req, res) {
    res.status(200).json({
        message: "Get brand by ID successfully!"
    });
}

export async function updateBrand(req, res) {
    res.status(200).json({
        message: "Update brand successfully!"
    });
}

export async function deleteBrand(req, res) {
    res.status(200).json({
        message: "Delete brand successfully!"
    });
}