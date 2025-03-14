import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import {Request, Response} from "express"
import { z } from "zod"

class TeamMembersController {
    async create (req: Request, res: Response) {
        const bodySchema = z.object({
            userId: z.string().uuid(),
            teamId: z.string().uuid()
        })
        
        const { userId, teamId} = bodySchema.parse(req.body)

        const existingTeamMember = await prisma.teamMembers.findFirst({
            where: {
                userId: userId,
                teamId: teamId,
            }
        });

        if(existingTeamMember) {
            throw new AppError("This user already on team")
        }

        const teamMember = await prisma.teamMembers.create({
            data: {
                userId: userId,
                teamId: teamId,
            }
        })

        return res.status(201).json({
            message: "this identification is the one that should be removed if necessary",
            idMember: teamMember.id
        })
    }

    async remove(req: Request, res: Response){
        const bodySchema = z.object({
            userId: z.string()
        })
        const { userId } = bodySchema.parse(req.body)
        
        const teamMember = await prisma.teamMembers.findUnique({
            where: {id: userId}
        })

        if(!teamMember) {
            throw new AppError("user not found")
        }

        await prisma.teamMembers.delete({
            where: { id: userId }
        })

        return res.json()
    }
}

export { TeamMembersController }