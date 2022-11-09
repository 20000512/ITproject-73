const host = 'http://localhost:5003'
const supertest = require('supertest')
const request = require('supertest');
const server = request.agent(host);
describe('users',  ()=> {
  test('sigin up sucessful', async () => {
    const data = await server.post("/users/signup").send({"email":"wwww12dSD3dasdaaa","password":"adasdasdas","username":"adasdasdasdaYrrrrY"})
    expect(data.statusCode).toBe(200);
  });
  test('Login sucessful', async () => {
    const data = await server.post("/users/login").send({"email":"wwww12dSD3dasdaaa","password":"adasdasdas"})
    expect(data.statusCode).toBe(200);
  });
  test('delete', async () => {
    const token = await (await server.post("/users/login").send({"email":"wwww12dSD3dasdaaa","password":"adasdasdas"})).body.token
    const data = await server.put("/users/delete").send({}).set({'authorization' : `Bearer ${token}`})
    expect(data.statusCode).toBe(200)
  });

})