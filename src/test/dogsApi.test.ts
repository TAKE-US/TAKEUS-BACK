import request from 'supertest'
import app from '../index'

test('GET /api/dogs의 Status Code 확인',async()=>{
    const response = await request(app).get('/api/dogs');
    expect(response.statusCode).toBe(200);
})