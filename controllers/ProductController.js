import { Sequelize } from "sequelize"
import db from "../models"
import InsertProductRequest from "../dtos/requests/InsertProductRequest"

const { Op } = Sequelize

export async function addProduct(req, res) {
    const product = await db.Product.create(req.body)

    return res.status(201).json({
        message: "Add product successfully!",
        data: product
    })
}

export async function getAllProducts(req, res) {
    const { search = '', page = 1 } = req.query // default to an empty search and first page if not specified
    const pageSize = 10 // number of items per page
    const offset = (page - 1) * pageSize // offset is used to skip previous page items

    let whereClause = {}

    if(search.trim() !== '') {
        whereClause = {
            [Op.or]: [
                { name: { [Op.like]: `%${search}` } },
                { description: { [Op.like]: `%${search}` } },
                { specification: { [Op.like]: `%${search}` } }
            ]
        }
    }

    const [products, totalProducts] = Promise.all([
        db.Product.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset
        }),
        db.Product.count({
            where: whereClause
        })
    ])

    res.status(200).json({
        message: "Get all products successfully!",
        data: products,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(totalProducts/pageSize),
        totalProducts
    })
}

export async function getProductByID(req, res) {
    //const productId = req.params.id
    const {id} = req.params
    const product = await db.Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        })
    }

    return res.status(200).json({
        message: "Get product by ID successfully!",
        data: product
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