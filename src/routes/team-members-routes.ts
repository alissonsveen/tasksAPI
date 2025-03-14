import { Router } from "express";


import { TeamMembersController } from "@/controllers/team-members-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const teamMemberRoutes = Router()
const teamMembersController = new TeamMembersController()

teamMemberRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["admin"]), teamMembersController.create)
teamMemberRoutes.delete("/", ensureAuthenticated, verifyUserAuthorization(["admin"]), teamMembersController.remove)

export { teamMemberRoutes }