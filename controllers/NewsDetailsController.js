import { Sequelize } from "sequelize"
import db from "../models"

const { Op } = Sequelize

export async function addNewsDetails(req, res) {
    const { productId, newsId } = req.body

    const productExists = await db.Product.findByPk(productId)

    if(!productExists) {
        return res.status(404).json({
            message: "Product does not exist!"
        })
    }

    const newsExists = await db.News.findByPk(newsId)

    if(!newsExists) {
        return res.status(404).json({
            message: "News does not exist!"
        })
    }

    // check if both product and news already exist together
    const duplicateExists = await db.NewsDetails.findOne({
        where: { productId, newsId }
    })

    if(duplicateExists) {
        return res.status(409).json({
            message: "Both news and product exist!"
        })
    }

    const newsDetails = await db.NewsDetails.create(req.body)

    return res.status(201).json({
        message: "Add news details successfully!",
        data: newsDetails
    })
}

export async function getAllNewsDetails(req, res) {
    const { page = 1 } = req.query // default to an empty search and first page if not specified
    const pageSize = 10 // number of items per page
    const offset = (page - 1) * pageSize // offset is used to skip previous page items

    const [newsDetails, totalNewsDetails] = await Promise.all([
        db.NewsDetails.findAll({
            limit: pageSize,
            offset: offset,
            include: [
                { model: db.News },
                { model: db.Product }
            ]
        }),
        db.NewsDetails.count({})
    ])

    return res.status(200).json({
        message: "Get all news details successfully!",
        data: newsDetails,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(totalNewsDetails / pageSize),
        totalNewsDetails
    })
}

export async function getNewsDetailsByID(req, res) {
    const { id } = req.params
    const newsDetails = await db.NewsDetails.findByPk(id, {
        include: [
            { model: db.News },
            { model: db.Product }
        ]
    })

    if (!newsDetails) {
        return res.status(404).json({
            message: "News details not found"
        })
    }

    return res.status(200).json({
        message: "Get news details by ID successfully!",
        data: newsDetails
    })
}

export async function updateNewsDetails(req, res) {
    const { id } = req.params
    const { productId, newsId } = req.body

    // check for existing duplicate that is not the current record
    const existingDuplicate = await db.NewsDetails.findOne({
        where: {
            productId,
            newsId,
            id: { [Sequelize.Op.ne]: id } // exclude the current record from the check
        }
    })

    if(existingDuplicate) {
        return res.status(409).json({
            message: "Both news and product exist in other record!"
        })
    }

    const updatedNewsDetails = await db.NewsDetails.update(req.body, {
        where: { id }
    })

    if (updatedNewsDetails[0] > 0) {
        return res.status(200).json({
            message: "Update news details successfully!"
        })
    } else {
        return res.status(404).json({
            message: "News details not found!"
        })
    }
}

export async function deleteNewsDetails(req, res) {
    const { id } = req.params
    const deleted = await db.NewsDetails.destroy({
        where: { id }
    })

    if (deleted) {
        return res.status(200).json({
            message: "Delete news details successfully!"
        })
    } else {
        return res.status(404).json({
            message: "News details not found!"
        })
    }
}