import request from "supertest";
import { prisma } from "@/database/prisma";
import { app } from "@/app";

describe("TasksController", () => {
    let JWTtoken: string;
    let taskId: string;
    let userId: string;

    beforeAll(async () => {
        const signUser = await request(app)
            .post("/sessions")
            .send({
                email: "alisson@email.com",
	            password: "123456"
            });

        JWTtoken = signUser.body.token;
        userId = signUser.body.id;
    })

    afterAll( async () => {
        await prisma.tasks.deleteMany({where: {id: taskId} })
    })

    it("should task created successfully", async () => {
        const tasks = await request(app)
            .post("/tasks")
            .set("Authorization", `Bearer ${JWTtoken}`)  
            .send({
                title: "teste",
                description: "teste tasks",
                priority: "high",
                assigned_to: "9a57de7c-e09c-40ab-a4cf-0056c40a832a",
                team_id: "603f1129-fbad-4534-a1a4-3033fd21b736"  
            });

            taskId = tasks.body.id
            
        expect(tasks.status).toBe(201);
        expect(tasks.body.message).toBe("task created successfully");
    });
});
