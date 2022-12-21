import { NextFunction, Request, Response } from "express";
import { createToken, createUser, loginCheck } from "../services/authService";

async function login(req: Request, res: Response, next: NextFunction): Promise<void>{
    const { username, password } = req.body

    try{
        const user = await loginCheck(username, password)

        if(!user){
            res.json({message: "Error!"})
        }
        const jwt = await createToken(user.id, username, user.role)
        res.send({jwt})
    }catch (error) {
        res.json({message: error.message})
    }
}

async function register(req: Request, res: Response, next: NextFunction): Promise<void>{
    const { username, password, role } = req.body

    try{
        const user = await createUser(username, password, role)
        if(!user) res.json({message: "Creating error"})
        const token = await createToken(user.id, username, role)

        res.json({token})
    }catch(error){
        res.json({message: error.message})
    }
}

export{
    login,
    register
}