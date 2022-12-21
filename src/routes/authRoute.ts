import { Router } from "express";
import { login, register } from "../controllers/authController";

const routerAuth = Router()

routerAuth.post('/signup', register)
routerAuth.post('/login', login)

export{routerAuth}