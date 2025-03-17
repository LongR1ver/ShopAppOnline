export async function addOrderDetails(req, res) {
    res.status(201).json({
        message: "Add order details successfully!"
    });
}

export async function getAllOrderDetails(req, res) {
    res.status(200).json({
        message: "Get all order details successfully!"
    });
}

export async function getOrderDetailsByID(req, res) {
    res.status(200).json({
        message: "Get order details by ID successfully!"
    });
}

export async function updateOrderDetails(req, res) {
    res.status(200).json({
        message: "Update order details successfully!"
    });
}

export async function deleteOrderDetails(req, res) {
    res.status(200).json({
        message: "Delete order details successfully!"
    });
}