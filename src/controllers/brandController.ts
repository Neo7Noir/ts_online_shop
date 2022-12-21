import { NextFunction, Request, Response } from "express";
import { Brand } from "../database/entities/brand";
import { addBrand, modifyBrand } from "../services/brandService";

async function createBrand(req:Request, res: Response, next: NextFunction): Promise<void> {
    const{name} = req.body

    try{
        const brand = await addBrand(name)

        if(!brand) res.json({message: "Creating error"})
        return next(res.json({message: "Brand succesufully created"}))
    } catch(err) {
        return next(res.json({message: err.message}))
    }   
}

async function deleteBrand(req: Request, res: Response, next: NextFunction): Promise<void> {
    const {id} = req.params

    try{
        const delBrand = await Brand.delete({
            id: id
        })

        if(!delBrand.affected) return next(res.json({message: "Product not exists"}))

        return next(res.json({message: "Brand was deleted"}))
    }catch(error){
        return next(res.json({message: error.message}))
    }
}

async function updateBrand(req: Request, res: Response ,next: NextFunction){
    const {id} = req.params
    const {name} = req.body

    try{
        await modifyBrand(id, name)
        return next(res.json({message: "Succesufully updated"}))
    } catch(error){
        return next(res.json({message: error.message}))
    }
    
}

export{
    createBrand,
    deleteBrand, 
    updateBrand
}