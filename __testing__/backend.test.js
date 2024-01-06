import request from 'supertest';
import app from '../server/server';

describe('Server Route Testing', () => {
    
    describe('Unkown route test', () => {
        it('should return status 500 for GET to unknown endpoints', async () => {
            const res = await request(app).get('/nonexistantroute');
            expect(res.statusCode).toBe(404);
        });
    });
})