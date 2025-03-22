import { Sequelize } from "sequelize"
import db from "../models"

export async function addOrder(req, res) {
    const order = await db.Order.create(req.body)

    return res.status(201).json({
        message: "Add order successfully!",
        data: order
    });
}

export async function getAllOrders(req, res) {
    res.status(200).json({
        message: "Get all orders successfully!"
    });
}

export async function getOrderByID(req, res) {
    res.status(200).json({
        message: "Get order by ID successfully!"
    });
}

export async function updateOrder(req, res) {
    const { id } = req.params;
    const updatedOrder = await db.Order.update(req.body, {
        where: { id }
    })

    if (updatedOrder[0] > 0) {
        return res.status(200).json({
            message: "Update order successfully!"
        })
    } else {
        return res.status(404).json({
            message: "Order not found!"
        })
    }
}

export async function deleteOrder(req, res) {
    const { id } = req.params;
    const deleted = await db.Order.destroy({
        where: { id }
    })

    if (deleted) {
        return res.status(200).json({
            message: "Delete order successfully!"
        })
    } else {
        return res.status(404).json({
            message: "Order not found!"
        })
    }
}