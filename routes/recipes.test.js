const host = "http://localhost:5003";
const supertest = require("supertest");
const request = require("supertest");
const server = request.agent(host);
describe("recipes", () => {
  test("get hottest recipes", async () => {
    const data = await server.get("/recipes/hot?page=int&limit=int");
    expect(data.statusCode).toBe(200);
  });
});
