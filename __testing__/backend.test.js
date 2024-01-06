import request from 'supertest';
import app from '../server/server';

describe('Server Route Testing', () => {
    
    describe('Unkown route test', () => {
        it('should return status 404 for GET to unknown endpoints', async () => {
            const res = await request(app).get('/nonexistantroute');
            expect(res.statusCode).toBe(404);
        });
    });

    describe('Serving static files', () => {
        it('should return static files for root route', async() => {
            const res = await request(app).get('/');
            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toMatch('text/html');
        })
    })

})