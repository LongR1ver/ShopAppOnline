import { Sequelize } from "sequelize"
import db from "../models"

const { Op } = Sequelize

export async function addBrand(req, res) {
    const brand = await db.Brand.create(req.body)

    return res.status(201).json({
        message: "Add brand successfully!",
        data: brand
    })
}

export async function getAllBrands(req, res) {
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

    const [brands, totalBrands] = await Promise.all([
            db.Brand.findAll({
                where: whereClause,
                limit: pageSize,
                offset: offset
            }),
            db.Brand.count({
                where: whereClause
            })
        ])

    return res.status(200).json({
        message: "Get all brands successfully!",
        data: brands,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(totalBrands/pageSize),
        totalBrands
    })
}

export async function getBrandByID(req, res) {
    const { id } = req.params
    const brand = await db.Brand.findByPk(id)

    if(!brand) {
        return res.status(404).json({
            message: "Brand not found"
        })
    }

    return res.status(200).json({
        message: "Get brand by ID successfully!",
        brand
    })
}

export async function updateBrand(req, res) {
    const { id } = req.params;
    const updatedBrand = await db.Brand.update(req.body, {
        where: { id }
    })

    if (updatedBrand[0] > 0) {
        return res.status(200).json({
            message: "Update brand successfully!"
        })
    } else {
        return res.status(404).json({
            message: "Brand not found!"
        })
    }
}

export async function deleteBrand(req, res) {
    const { id } = req.params;
    const deleted = await db.Brand.destroy({
        where: { id }
    })

    if (deleted) {
        return res.status(200).json({
            message: "Delete brand successfully!"
        })
    } else {
        return res.status(404).json({
            message: "Brand not found!"
        })
    }
}