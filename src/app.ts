import express from "express"
import "express-async-errors"

import { routes } from "./routes"
import { ErrorHandling } from "./middlewares/error-handling"

const app = express()

app.use(express.json())
app.use(routes)

app.use(ErrorHandling)

export { app }