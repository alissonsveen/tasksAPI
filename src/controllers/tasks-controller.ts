import { authConfig } from "@/configs/auth"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import {Request, Response} from "express"
import { z } from "zod"

class TasksController {
    async create (req: Request, res: Response) {
        const bodySchema = z.object({
            title: z.string().trim().min(3),
            description: z.string().trim().min(3),
            status: z.enum(["pending", "in_progress", "completed"]).optional(),
            priority: z.enum(["high", "medium", "low"]),
            assigned_to: z.string(),
            team_id: z.string(),
        })

        const { title, description, status, priority, assigned_to, team_id} = bodySchema.parse(req.body)

        const user = await prisma.users.findFirst({
            where: {id: assigned_to}
        })

        if(!user) {
            throw new AppError("User not found", 404)
        }

        const teams = await prisma.teams.findFirst({
            where: {id: team_id}
        })

        if(!teams) {
            throw new AppError("Team not found", 404)
        }

         await prisma.tasks.create({
            data: {
                title,
                description,
                status,
                priority,
                assignedTo: assigned_to,
                teamId: team_id
            }
        })

        return res.status(201).json(
            { message: "task created successfully"}
        )
    }

    async show (req: Request, res: Response) {
        const bodySchema = z.object({
            id: z.string().optional(),
            title: z.string().optional(),
            description: z.string().optional(),
            status: z.enum(["pending", "in_progress", "completed"]).optional(),
            priority: z.enum(["high", "medium", "low"]).optional(),
            assigned_to: z.string().optional(),
            team_id: z.string().optional(),
        })
        const { title, description, status, priority, assigned_to, team_id, id} = bodySchema.parse(req.query)

        const task = await prisma.tasks.findFirst({ where: { id }});

        if(req.user.role === "member" && req.user.id !== task?.assignedTo) {
            throw new AppError("the user can only view their tasks", 401)
        }
    
        const tasks = await prisma.tasks.findMany({
            where: {
                title: {
                    contains: title,
                    mode: "insensitive" 
                },
                description: {
                    contains: description,
                    mode: "insensitive"
                },
                status, 
                priority,
                assignedTo: assigned_to,
                teamId: team_id
            }
        });
        return res.json({ tasks })
    }

    async update(req: Request, res: Response) {
        const bodySchema = z.object({
            id: z.string(),
            title: z.string().optional(),
            description: z.string().optional(),
            status: z.enum(["pending", "in_progress", "completed"]),
            priority: z.enum(["high", "medium", "low"]),
            assignedTo: z.string().optional(), 
        });
    
        const { id, title, description, status, priority, assignedTo } = bodySchema.parse(req.body);
    
        const task = await prisma.tasks.findUnique({ where: { id } });
    
        if (!task) {
            throw new AppError("Task not found", 404);
        }
    
        const changedBy = req.user.id; 
    
        if (status && status !== task.status) {
            await prisma.taskHistory.create({
                data: {
                    taskId: id,          
                    changedBy,           
                    oldStatus: task.status,  
                    newStatus: status,  
                },
            });
        } 

        if(req.user.role === "member" && req.user.id !== task.assignedTo) {
            throw new AppError("the user can only update their tasks", 401)
        }
    
       
        const updatedTask = await prisma.tasks.update({
            where: { id },
            data: {
                title,
                description,
                status,
                priority,
                assignedTo, 
            },
        });
    
        return res.json(updatedTask);
    }
    
    
    
}

export { TasksController }