import { Sequelize } from "sequelize"
import db from "../models"

const { Op } = Sequelize

export async function addNews(req, res) {
    const transaction = await db.sequelize.transaction()

    try {
        const news = await db.News.create(req.body, { transaction });
        const productIds = req.body.productIds

        if(productIds && productIds.length) {
            const validProducts = await db.Product.findAll({
                where: {
                    id: productIds
                },
                transaction
            })

            const validProductIds = validProducts.map(product => product.id)
            const filteredProductIds = productIds.filter(id => validProductIds.includes(id))

            const newsDetailsPromise = filteredProductIds.map(productId => db.NewsDetails.create({
                productId: productId,
                newsId: news.id
            }, { transaction }))

            await Promise.all(newsDetailsPromise)
        }

        await transaction.commit()

        return res.status(201).json({
            message: "Add news successfully!",
            data: news
        });
    } catch(error) {
        await transaction.rollback()

        return res.status(500).json({
            message: "Can not add news",
            error: error.message
        })
    }
}

export async function getAllNews(req, res) {
    const { search = '', page = 1 } = req.query;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    let whereClause = {};

    if(search.trim() !== '') {
        whereClause = {
            [Op.or]: [
                { title: { [Op.iLike]: `%${search}%` } },
                { content: { [Op.iLike]: `%${search}%` } }
            ]
        };
    }

    const [news, totalNews] = await Promise.all([
        db.News.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset
        }),
        db.News.count({
            where: whereClause
        })
    ]);

    return res.status(200).json({
        message: "Get all news successfully!",
        data: news,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(totalNews / pageSize),
        totalNews
    });
}

export async function getNewsByID(req, res) {
    const { id } = req.params;
    const news = await db.News.findByPk(id);

    if(!news) {
        return res.status(404).json({
            message: "News not found"
        });
    }

    return res.status(200).json({
        message: "Get news by ID successfully!",
        data: news
    });
}

export async function updateNews(req, res) {
    const { id } = req.params;
    const updatedNews = await db.News.update(req.body, {
        where: { id }
    });

    if(updatedNews[0] > 0) {
        return res.status(200).json({
            message: "Update news successfully!"
        });
    } else {
        return res.status(404).json({
            message: "News not found!"
        });
    }
}

export async function deleteNews(req, res) {
    const { id } = req.params;
    const deleted = await db.News.destroy({
        where: { id }
    });

    if(deleted) {
        return res.status(200).json({
            message: "Delete news successfully!"
        });
    } else {
        return res.status(404).json({
            message: "News not found!"
        });
    }
}