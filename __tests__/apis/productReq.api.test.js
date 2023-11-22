const request = require('supertest');
const Express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = new Express();

app.use('/productReq', require('../../src/routes/productReq.route'));

const lastId = async () => {
  const productReq = await prisma.productReq.findMany();
  return productReq[productReq.length - 1].id;
};

describe('GET /productReq', () => {
  it('Should get all productReq', async () => {
    const response = await request(app).get('/productReq');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
  });
});

describe('GET /productReq', () => {
  it('Should get productReq with id 2', async () => {
    const response = await request(app).get('/productReq/2');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

/* THIS REQUEST NEED CREDENTIALS REQUIREMENT THAT CAN TEST IN UNIT TEST */
// describe('POST /productReq/create', () => {
//   it('Should create a new productReq with picture', async () => {
//     const newProductReq = {
//       title: 'Betadine',
//       userId: 1,
//       typeId: 4,
//       desc: 'Untuk mengobati luka',
//       price: 3000,
//     };

//     const filePath =
//       'D:/luqman/SMKN 4 BANDUNG XI/PKK/InRoomService/InRoomService-Backend/public/assets/images/betadine.jpg';

//     const response = await request(app)
//       .post('/productReq/create')
//       .field('title', newProductReq.title)
//       .field('userId', newProductReq.userId)
//       .field('typeId', newProductReq.typeId)
//       .field('desc', newProductReq.desc)
//       .field('price', newProductReq.price)
//       .attach('picture', filePath);

//     expect(response.statusCode).toBe(201);
//     expect(response.body).toHaveProperty('data');
//   });
// });

// describe('PUT /productReq/update/:id', () => {
//   it('Should update an existing productReq', async () => {
//     const updatedProductReq = {
//       title: 'Loreal Shampoo',
//       userId: 1,
//       typeId: 3,
//       desc: 'Membersihkan rambut anda dari kotoran',
//       price: 25000,
//     };

//     const filePath =
//       'D:/luqman/SMKN 4 BANDUNG XI/PKK/InRoomService/InRoomService-Backend/public/assets/images/loreal.jpg';

//     const response = await request(app)
//       .put(`/productReq/update/3`)
//       .field('title', updatedProductReq.title)
//       .field('userId', updatedProductReq.userId)
//       .field('typeId', updatedProductReq.typeId)
//       .field('desc', updatedProductReq.desc)
//       .field('price', updatedProductReq.price)
//       .attach('picture', filePath);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('data');
//   });
// });

describe('DELETE /productReq', () => {
  it('Should delete productReq with ID', async () => {
    const id = await lastId();
    const response = await request(app).delete(`/productReq/delete/${id}`);
    expect(response.statusCode).toBe(200);
  });
});
