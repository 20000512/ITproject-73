const users = require ("./users.js")
const supertest = require('supertest')
const router = require('express').Router();
const request = require('supertest');
const { response } = require("express");
test("should respond with a 200 tatus code",async () => {
    const response = await request(users).post("/signup").send({"email":"wwww12dSD3","password":"adasdasdas","username":"adasdasdasdaYrrrrY"})
    expect(response.statusCode).toBe(200)
})
        