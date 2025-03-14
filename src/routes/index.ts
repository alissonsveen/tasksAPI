import { Router } from "express"

import { usersRoutes } from "./user-routes"
import { teamsRoutes } from "./teams-routes"
import { teamMemberRoutes } from "./team-members-routes"
import { tasksRoutes } from "./tasks-routes"
import { sessionRoutes } from "./sessions-routes"

const routes = Router()
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/teams", teamsRoutes)
routes.use("/teams_members", teamMemberRoutes)
routes.use("/tasks", tasksRoutes)

export { routes }