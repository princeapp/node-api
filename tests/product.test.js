
const request = require('supertest');
const app = require('../index');

let server;
let token;

beforeAll(async () => {
    server = app.listen(4000); // Start the server on a different port for testing
    const response = await request(app)
        .post('/api/login')
        .send({ username: 'prince', password: 'qwerty' });

    token = response.body.token; // Extract token from response
});

afterAll((done) => {
    server.close(done); // Close the server after all tests are done
});

describe('Product API', () => {
    it('should create a product', async () => {
        const response = await request(app)
            .post('/api/products')
            .set('Authorization', `${token}`)
            .send({
                name: 'Test Product',
                description: 'This is a test product',
                price: 99.99
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'Test Product');
    });

    it('should get all products', async () => {
        const response = await request(app)
            .get('/api/products')
            .set('Authorization', `${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should update a product', async () => {
        const createResponse = await request(app)
            .post('/api/products')
            .set('Authorization', `${token}`)
            .send({
                name: 'Product to Update',
                description: 'This product will be updated',
                price: 50.00
            });

        const productId = createResponse.body.id;

        const updateResponse = await request(app)
            .put(`/api/products/${productId}`)
            .set('Authorization', `${token}`)
            .send({
                name: 'Updated Product',
                description: 'This product has been updated',
                price: 75.00
            });

        expect(updateResponse.statusCode).toBe(200);
        expect(updateResponse.body).toHaveProperty('name', 'Updated Product');
    });

    it('should delete a product', async () => {
        const createResponse = await request(app)
            .post('/api/products')
            .set('Authorization', `${token}`)
            .send({
                name: 'Product to Delete',
                description: 'This product will be deleted',
                price: 20.00
            });

        const productId = createResponse.body.id;

        const deleteResponse = await request(app)
            .delete(`/api/products/${productId}`)
            .set('Authorization', `${token}`);

        expect(deleteResponse.statusCode).toBe(204);
    });
});
