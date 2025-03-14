import  request  from "supertest";
import { prisma } from "@/database/prisma"

import { app } from "@/app";

describe("SessionsController", () => {
    let user_id: string

    afterAll(async () => {
        await prisma.users.delete({ where: {id: user_id} })
    })

    it("should authenticate a and get access token", async () => {
      const userRes =  await request(app).post("/users").send({
            name: "Auth Test User",
            email: "auth_test_euser@example.com",
            password: "password123",
        })

        user_id = userRes.body.id

        const loginUser = await await request(app).post("/sessions").send({
            email: "auth_test_euser@example.com",
            password: "password123", 
        })

        expect(loginUser.status).toBe(200)
        expect(loginUser.body.token).toEqual(expect.any(String))
    })
})