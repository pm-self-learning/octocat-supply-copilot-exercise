import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import productRouter, { resetProducts } from './product';
import { products as seedProducts } from '../seedData';

let app: express.Express;

describe('Product API', () => {
    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use('/products', productRouter);
        resetProducts();
    });

    // Test creating a new product
    it('should create a new product', async () => {
        const newProduct = {
            productId: 5,
            supplierId: 2,
            name: "Test Product",
            description: "A product for testing",
            price: 199.99,
            sku: "TEST-001",
            unit: "piece",
            imgName: "test.png"
        };
        const response = await request(app).post('/products').send(newProduct);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newProduct);
    });

    // Test retrieving all products
    it('should get all products', async () => {
        const response = await request(app).get('/products');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(seedProducts.length);
        response.body.forEach((product: any, index: number) => {
            expect(product).toMatchObject(seedProducts[index]);
        });
    });

    // Test retrieving a single product by ID
    it('should get a product by ID', async () => {
        const response = await request(app).get('/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(seedProducts[0]);
    });

    // Test updating a product
    it('should update a product by ID', async () => {
        const updatedProduct = {
            ...seedProducts[0],
            name: 'Updated PowerTool Pro X1',
            price: 1399.99
        };
        const response = await request(app).put('/products/1').send(updatedProduct);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedProduct);
    });

    // Test deleting a product
    it('should delete a product by ID', async () => {
        const response = await request(app).delete('/products/1');
        expect(response.status).toBe(204);
    });

    // Test 404 for non-existent product
    it('should return 404 for non-existing product', async () => {
        const response = await request(app).get('/products/999');
        expect(response.status).toBe(404);
        expect(response.text).toBe('Product not found');
    });

    // Additional tests for edge cases and error handling

    it('should return 404 when trying to update a non-existing product', async () => {
        const updatedProduct = {
            productId: 999,
            supplierId: 1,
            name: "Non-existent Product",
            description: "This product doesn't exist",
            price: 99.99,
            sku: "NON-001",
            unit: "piece",
            imgName: "none.png"
        };
        const response = await request(app).put('/products/999').send(updatedProduct);
        expect(response.status).toBe(404);
        expect(response.text).toBe('Product not found');
    });

    it('should return 404 when trying to delete a non-existing product', async () => {
        const response = await request(app).delete('/products/999');
        expect(response.status).toBe(404);
        expect(response.text).toBe('Product not found');
    });

    it('should handle non-numeric product ID correctly', async () => {
        const response = await request(app).get('/products/invalid');
        expect(response.status).toBe(404);
    });

    it('should verify product list changes after deletion', async () => {
        const initialResponse = await request(app).get('/products');
        const initialCount = initialResponse.body.length;
        
        await request(app).delete('/products/1');
        
        const afterDeleteResponse = await request(app).get('/products');
        expect(afterDeleteResponse.body.length).toBe(initialCount - 1);
        expect(afterDeleteResponse.body.find((p: any) => p.productId === 1)).toBeUndefined();
    });

    it('should verify product data after update', async () => {
        const newName = 'Extremely Powerful Tool';
        const newPrice = 1499.99;
        
        const updatedProduct = {
            ...seedProducts[0],
            name: newName,
            price: newPrice
        };
        
        await request(app).put('/products/1').send(updatedProduct);
        
        const response = await request(app).get('/products/1');
        expect(response.body.name).toBe(newName);
        expect(response.body.price).toBe(newPrice);
    });
});
