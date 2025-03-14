import request from "supertest";
import { prisma } from "@/database/prisma";
import { app } from "@/app";

describe("TeamsController", () => {
    let JWTtoken: string;
    let teamId: string;
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

    afterAll(async () => {
        if (teamId) {
            await prisma.teams.delete({ where: { id: teamId } });
        }
    })

    it("should create a new team successfully", async () => {
        const team = await request(app)
            .post("/teams")
            .set("Authorization", `Bearer ${JWTtoken}`)
            .send({
                name: "team test",
                description: "description test"
            })

        teamId = team.body.id;

        expect(team.status).toBe(201);
        expect(team.body.name).toBe("team test");
        expect(team.body).toHaveProperty("id");
    })

    it("should verify name this team already exists", async () => {
        const teamWithSameName = await request(app)
            .post("/teams")
            .set("Authorization", `Bearer ${JWTtoken}`)
            .send({
                name: "team test",
                description: "description test"
            })

        expect(teamWithSameName.status).toBe(400);
        expect(teamWithSameName.body.message).toBe("name this team already exists");
    })
})
