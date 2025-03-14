import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import {Request, Response} from "express"
import { z } from "zod"

class TeamsController {
    async create (req: Request, res: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(3),
            description: z.string().trim().min(3),
        })

        const { name, description } = bodySchema.parse(req.body)

        const verifyNameTeam = await prisma.teams.findFirst({
            where: {name: name}
        })

        if(verifyNameTeam){
            throw new AppError("name this team already exists")
        }

        const Teams = await prisma.teams.create({
            data: {
                name,
                description
            }
        })

        return res.status(201).json(Teams)
    }

    async edit (req: Request, res: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(3),
            description: z.string().trim().min(3),
        })

        const { name, description } = bodySchema.parse(req.body)

        await prisma.teams.updateMany({
            data: {
                name,
                description
            },
        })

        return res.json()
    }
}

export { TeamsController }