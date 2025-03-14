import {Request, Response} from "express"
import { authConfig } from "@/configs/auth"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import { sign, SignOptions } from "jsonwebtoken"
import { compare } from "bcrypt"
import { z } from "zod"
import { StringValue } from 'ms'

class SessionsController {
    async create (req: Request, res: Response) {
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { email, password } = bodySchema.parse(req.body)

        const user = await prisma.users.findFirst({
            where: { email }
        })  

        if(!user) {
            throw new AppError("Invalid email or password", 401)
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched) {
            throw new AppError("Invalid email or password", 401)
        }

        const {secret, expiresIn } = authConfig.jwt

        const options: SignOptions = {
            subject: user.id,
            expiresIn: expiresIn as StringValue
        }

        const token = sign({role: user.role ?? "admin"}, secret, options)
    

        const {password: hashPassword, ...userWithoutPassword} = user


        return res.json({ token, user: userWithoutPassword })
    }
}

export { SessionsController }