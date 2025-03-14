import request from "supertest";
import { prisma } from "@/database/prisma";
import { app } from "@/app";

describe("TeamsMembers", () => {
    let JWTtoken: string;
    let teamMembers: string;
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
        const teamMember = await prisma.teamMembers.findFirst({
            where: {
                userId: userId,
                teamId: "603f1129-fbad-4534-a1a4-3033fd21b736" 
            }
        });
    
        if (teamMember) {
            await prisma.teamMembers.delete({
                where: {
                    id: teamMember.id 
                }
            });
        }
    });
    
    it("should add a new user to the team", async () => {
        const MembersTeam = await request(app)
            .post("/teams_members")
            .set("Authorization", `Bearer ${JWTtoken}`)
            .send({
                userId: "3bc255dc-08ed-48fd-a42d-5ce07248b66e",
                teamId: "603f1129-fbad-4534-a1a4-3033fd21b736"
            })

            teamMembers = MembersTeam.body.id;
        expect(MembersTeam.status).toBe(201);
        expect(MembersTeam.body.message).toBe("this identification is the one that should be removed if necessary");
        expect(MembersTeam.body).toHaveProperty("idMember");
    })

    it("should verify This user already on team", async () => {
        const existingTeamMember = await request(app)
            .post("/teams_members")
            .set("Authorization", `Bearer ${JWTtoken}`)
            .send({
               userId: "3bc255dc-08ed-48fd-a42d-5ce07248b66e",
               teamId: "603f1129-fbad-4534-a1a4-3033fd21b736"
            })

        expect(existingTeamMember.status).toBe(400);
        expect(existingTeamMember.body.message).toBe("This user already on team");
    })
})
