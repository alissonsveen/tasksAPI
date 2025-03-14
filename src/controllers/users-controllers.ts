import {Request, Response} from "express"
import { AppError } from "@/utils/AppError"
import { z } from "zod"
import { hash } from "bcrypt"
import { prisma } from "@/database/prisma"
 
class UserController {
    async create (req: Request, res: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(3),
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { name, email, password } = bodySchema.parse(req.body)

        const userWithSameEmail = await prisma.users.findFirst({ where: {email} })

        if(userWithSameEmail) {
            throw new AppError("User with same email already exists")
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.users.create({
            data: {
                name, 
                email,
                password: hashedPassword,
            }
        })

        const { password: _, ...userWithoutPassword} = user

        return res.status(201).json(userWithoutPassword)
    }
}

export { UserController }