import { Sequelize } from "sequelize"
import db from "../models"

const { Op } = Sequelize

export async function addCategory(req, res) {
    const category = await db.Category.create(req.body)

    return res.status(201).json({
        message: "Add category successfully!",
        data: category
    })
}

export async function getAllCategories(req, res) {
    const { search = '', page = 1 } = req.query // default to an empty search and first page if not specified
    const pageSize = 10 // number of items per page
    const offset = (page - 1) * pageSize // offset is used to skip previous page items

    let whereClause = {}

    if(search.trim() !== '') {
        whereClause = {
            [Op.or]: [
                { name: { [Op.iLike]: `%${search}%` } }
            ]
        }
    }

    const [categories, totalCategories] = await Promise.all([
        db.Category.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset
        }),
        db.Category.count({
            where: whereClause
        })
    ])

    return res.status(200).json({
        message: "Get all categories successfully!",
        data: categories,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(totalCategories/pageSize),
        totalCategories
    })
}

export async function getCategoryByID(req, res) {
    const { id } = req.params
    const category = await db.Category.findByPk(id)

    if(!category) {
        return res.status(404).json({
            message: "Category not found"
        })
    }

    return res.status(200).json({
        message: "Get category by ID successfully!",
        data: category
    })
}

export async function updateCategory(req, res) {
    const { id } = req.params;
    const updatedCategory = await db.Category.update(req.body, {
        where: { id }
    })

    if (updatedCategory[0] > 0) {
        return res.status(200).json({
            message: "Update category successfully!"
        })
    } else {
        return res.status(404).json({
            message: "Category not found!"
        })
    }
}

export async function deleteCategory(req, res) {
    const { id } = req.params;
    const deleted = await db.Category.destroy({
        where: { id }
    })

    if (deleted) {
        return res.status(200).json({
            message: "Delete category successfully!"
        })
    } else {
        return res.status(404).json({
            message: "Category not found!"
        })
    }
}