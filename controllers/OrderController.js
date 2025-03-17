export async function addOrder(req, res) {
    res.status(201).json({
        message: "Add order successfully!"
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
    res.status(200).json({
        message: "Update order successfully!"
    });
}

export async function deleteOrder(req, res) {
    res.status(200).json({
        message: "Delete order successfully!"
    });
}