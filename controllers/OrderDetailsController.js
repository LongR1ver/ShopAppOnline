import { Sequelize } from "sequelize"
import db from "../models"

export async function addOrderDetails(req, res) {
    const orderDetails = await db.orderDetails.create(req.body)

    res.status(201).json({
        message: "Add order details successfully!",
        data: orderDetails
    });
}

export async function getAllOrderDetails(req, res) {
    const orderDetails = await db.orderDetails.findAll()

    return res.status(200).json({
        message: "Get all order details successfully!",
        data: orderDetails
    });
}

export async function getOrderDetailsByID(req, res) {
    const { id } = req.params
    const orderDetails = await db.orderDetails.findByPk(id)

    if(!orderDetails) {
        return res.status(404).json({
            message: "Order details not found!"
        })
    }

    return res.status(200).json({
        message: "Get order details by ID successfully!",
        data: orderDetails
    });
}

export async function updateOrderDetails(req, res) {
    const { id } = req.params;
    const updatedOrderDetails = await db.orderDetails.update(req.body, {
        where: { id }
    })

    if (updatedOrderDetails[0] > 0) {
        return res.status(200).json({
            message: "Update order details successfully!"
        })
    } else {
        return res.status(404).json({
            message: "Order details not found!"
        })
    }
}

export async function deleteOrderDetails(req, res) {
    const { id } = req.params;
    const deleted = await db.orderDetails.destroy({
        where: { id }
    })

    if(deleted) {
        res.status(200).json({
            message: "Delete order details successfully!"
        })
    } else {
        res.status(404).json({
            message: "Order details not found!"
        })
    }
}