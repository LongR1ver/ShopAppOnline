import express from 'express'
import * as ProductController from './controllers/ProductController'
import * as CategoryController from './controllers/CategoryController'
import * as BrandController from './controllers/BrandController'
import * as OrderController from './controllers/OrderController'
import * as OrderDetailsController from './controllers/OrderDetailsController'
import asyncHandler from './middlewares/asyncHandler'
import validate from './middlewares/validate'
import InsertProductRequest from './dtos/requests/InsertProductRequest'
import UpdateProductRequest from './dtos/requests/UpdateProductRequest'

const router = express.Router()

export function AppRoute(app) {
    // http://localhost:3000/api/products
    router.post('/products', validate(InsertProductRequest), asyncHandler(ProductController.addProduct));
    router.get('/products', asyncHandler(ProductController.getAllProducts));
    router.get('/products/:id', asyncHandler(ProductController.getProductByID));
    router.put('/products/:id', validate(UpdateProductRequest), asyncHandler(ProductController.updateProduct));
    router.delete('/products/:id', asyncHandler(ProductController.deleteProduct));

    // http://localhost:3000/api/categories
    router.post('/categories', asyncHandler(CategoryController.addCategory));
    router.get('/categories', asyncHandler(CategoryController.getAllCategories));
    router.get('/categories/:id', asyncHandler(CategoryController.getCategoryByID));
    router.put('/categories/:id', asyncHandler(CategoryController.updateCategory));
    router.delete('/categories/:id', asyncHandler(CategoryController.deleteCategory));

    // http://localhost:3000/api/brands
    router.post('/brands', asyncHandler(BrandController.addBrand));
    router.get('/brands', asyncHandler(BrandController.getAllBrands));
    router.get('/brands/:id', asyncHandler(BrandController.getBrandByID));
    router.put('/brands/:id', asyncHandler(BrandController.updateBrand));
    router.delete('/brands/:id', asyncHandler(BrandController.deleteBrand));

    // http://localhost:3000/api/orders
    router.post('/orders', asyncHandler(OrderController.addOrder));
    router.get('/orders', asyncHandler(OrderController.getAllOrders));
    router.get('/orders/:id', asyncHandler(OrderController.getOrderByID));
    router.put('/orders/:id', asyncHandler(OrderController.updateOrder));
    router.delete('/orders/:id', asyncHandler(OrderController.deleteOrder));

    // http://localhost:3000/api/order-details
    router.post('/order-details', asyncHandler(OrderDetailsController.addOrderDetails));
    router.get('/order-details', asyncHandler(OrderDetailsController.getAllOrderDetails));
    router.get('/order-details/:id', asyncHandler(OrderDetailsController.getOrderDetailsByID));
    router.put('/order-details/:id', asyncHandler(OrderDetailsController.updateOrderDetails));
    router.delete('/order-details/:id', asyncHandler(OrderDetailsController.deleteOrderDetails));

    app.use('/api/', router)
}