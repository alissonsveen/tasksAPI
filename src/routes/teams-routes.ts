import { Router } from "express";


import { TeamsController } from "@/controllers/teams-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const teamsRoutes = Router()
const teamsController = new TeamsController()

teamsRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["admin"]), teamsController.create)
teamsRoutes.put("/", ensureAuthenticated, verifyUserAuthorization(["admin"]), teamsController.edit)


export { teamsRoutes }