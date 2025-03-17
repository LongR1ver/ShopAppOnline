import express from 'express'
import * as ProductController from './controllers/ProductController'
import * as CategoryController from './controllers/CategoryController'
import * as BrandController from './controllers/BrandController'
import * as OrderController from './controllers/OrderController'
import * as OrderDetailsController from './controllers/OrderDetailsController'

const router = express.Router()

export function AppRoute(app) {
    // http://localhost:3000/api/products
    router.post('/products', ProductController.addProduct)
    router.get('/products', ProductController.getAllProducts)
    router.get('/products/:id', ProductController.getProductByID)
    router.put('/products/:id', ProductController.updateProduct)
    router.delete('/products/:id', ProductController.deleteProduct)

    // http://localhost:3000/api/categories
    router.post('/categories', CategoryController.addCategory)
    router.get('/categories', CategoryController.getAllCategories)
    router.get('/categories/:id', CategoryController.getCategoryByID)
    router.put('/categories/:id', CategoryController.updateCategory)
    router.delete('/categories/:id', CategoryController.deleteCategory)

    // http://localhost:3000/api/brands
    router.post('/brands', BrandController.addBrand);
    router.get('/brands', BrandController.getAllBrands);
    router.get('/brands/:id', BrandController.getBrandByID);
    router.put('/brands/:id', BrandController.updateBrand);
    router.delete('/brands/:id', BrandController.deleteBrand);

    // http://localhost:3000/api/orders
    router.post('/orders', OrderController.addOrder);
    router.get('/orders', OrderController.getAllOrders);
    router.get('/orders/:id', OrderController.getOrderByID);
    router.put('/orders/:id', OrderController.updateOrder);
    router.delete('/orders/:id', OrderController.deleteOrder);

    // http://localhost:3000/api/order-details
    router.post('/order-details', OrderDetailsController.addOrderDetails);
    router.get('/order-details', OrderDetailsController.getAllOrderDetails);
    router.get('/order-details/:id', OrderDetailsController.getOrderDetailsByID);
    router.put('/order-details/:id', OrderDetailsController.updateOrderDetails);
    router.delete('/order-details/:id', OrderDetailsController.deleteOrderDetails);

    app.use('/api/', router)
}