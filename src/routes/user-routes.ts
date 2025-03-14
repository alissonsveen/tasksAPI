import { Router } from "express";

import { UserController } from "@/controllers/users-controllers";

const usersRoutes = Router()
const userController = new UserController()

usersRoutes.post("/", userController.create)

export { usersRoutes }