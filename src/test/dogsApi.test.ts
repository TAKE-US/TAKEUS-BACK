import request from 'supertest'
import app from '../index'
import mongoose from 'mongoose';

const allTestURI = '/api/dogs?page=1&postNumInPage=3&order=latest';

describe('GET /api/dogs',()=>{

    it('Status Code 200 확인',async()=>{
        const response = await request(app.app).get(allTestURI);       
        expect(response.statusCode).toBe(200);
    });

    it('response의 데이터 갯수 확인',async()=> {
        const response = await request(app.app).get(allTestURI);       
        const data = JSON.parse(response.text).data;
        expect(data.length).toBe(3);
    });

    it('response의 데이터 순서 확인',async()=>{
        const response = await request(app.app).get(allTestURI);
        const data = JSON.parse(response.text).data;
        const older:number = Date.parse(data[1].registerDate);
        const newer:number = Date.parse(data[0].registerDate);
        expect(newer - older > 0).toBe(true);
    });

    it('page에 따른 데이터 확인', async()=>{
        const page1Num3Response = await request(app.app).get(allTestURI);
        const page1Num1Response = await request(app.app).get('/api/dogs?page=1&postNumInPage=1&order=latest');
        const page2Num1Response = await request(app.app).get('/api/dogs?page=2&postNumInPage=1&order=latest');

        const page1Num3 = JSON.parse(page1Num3Response.text).data;
        const page1Num1 = JSON.parse(page1Num1Response.text).data;
        const page2Num1 = JSON.parse(page2Num1Response.text).data;

        expect(page1Num3[0]._id).toBe(page1Num1[0]._id);
        expect(page1Num3[1]._id).toBe(page2Num1[0]._id);
    });

    afterAll(() => { 
        mongoose.disconnect();
        app.server.close();
    });
})