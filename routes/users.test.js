const users = require ("./users.js")
const supertest = require('supertest')
const router = require('express').Router();
const request = require('supertest')
test("should respond with a 200 tatus code",async () => {
    console.log("aaaaaaaaaaaaaaaaa");
    const response = await request(users).post("/signup").send({"email":"wwww12dSD3","password":"adasdasdas","username":"adasdasdasdaYrrrrY"})
    console.log("BBBBBBBBBBBBB");
    expect(response.statusCode).toBe(200)
})
        