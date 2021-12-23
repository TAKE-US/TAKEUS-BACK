import request from 'supertest'
import app from '../index'

describe ('', async ()=>{
  const response = await request(app).get('/api/dogs');

  beforeAll(async()=>{

  });

  afterAll(async()=>{

  })
})