import { sign } from "jsonwebtoken"
import { AppDataSource } from "../database/dbConnections"
import { User } from "../database/entities/user"
import { compareSync, hash } from "bcrypt"

function createToken(userId : string, username: string, role: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        sign({ userId, username, role}, process.env.JWT_SIGN_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if(err) reject(err)

            resolve(token)
        })
    })
}

async function if_user(username: string): Promise<User>{
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where : {
            username:username
        }
    })
    return user
}

async function createUser(username: string, password: string, role: string): Promise<User>{
    try{
        const user = await if_user(username)

        if(user) throw new Error("User with this username already exists")

        const hashPass = await hash(password, 10)

        const newUser = User.create({
            username: username,
            password: hashPass,
            role: role
        })
        await newUser.save()

        return newUser
    }catch(error){
        throw new Error(error.message)
    }
}

async function loginCheck(username: string, password: string): Promise<User>{
    try{
        const user = await if_user(username)

        if(!user) throw new Error("Incorrect username")

        let comparePassword = compareSync(password, user.password)

        if(!comparePassword) throw new Error("Incorrect pass")

        return user
    }catch(error){
        throw new Error(error.message)
    }
}

export{
    createToken,
    createUser,
    loginCheck
}