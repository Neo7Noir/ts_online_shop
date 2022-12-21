import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { TokenInfo, UserRequest } from "../interfaces/userInterface"

function checkToken(bearerToken: string): string | undefined{
    if(!bearerToken){
        return undefined
    }
    const token = bearerToken.split(' ')[1]

    return token
}

function checkRole(role : string[]){
    return function(req : Request, res : Response, next : NextFunction){
        const token = checkToken(req.headers.authorization)

        if(!token){
            return next(res.json({ message : "Not Authorized!" }))
        }

        try {
            const decodedToken = <TokenInfo>verify(token, process.env.JWT_SIGN_KEY)

            if(!role.includes(decodedToken.role) && decodedToken.role != "ADMIN"){
                return next(res.json({ message : "You dont have permission!" }))
            }

            (req as UserRequest).user = decodedToken
            
            return next()
        } catch (error) {
            return next(res.json({ message : error.message }))
        }
    }
}

export{
    checkRole
}