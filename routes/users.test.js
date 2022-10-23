const users = require ("./users.js")
const supertest = require('supertest')
const request = supertest(users)

        test("should respond with a 200 tatus code",async () => {
            const response = await request(user).post("/signup").send({
                email:"w666",
                password: "w666",
                username:"w666"
            })
            expect(response.statusCode).toBe(200)
    }).set('Content-Type', 'application/json')
        