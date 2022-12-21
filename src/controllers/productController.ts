import { NextFunction, Request, Response } from "express";
import { ILike } from "typeorm";
import { AppDataSource } from "../database/dbConnections";
import { Product } from "../database/entities/product";
import { addProduct, findProduct, getProducts, modifyProduct } from "../services/productService";

async function createProduct(req: Request, res: Response, next: NextFunction): Promise<void>{
    const {name, price, brand} = req.body

    try{
        const product = await addProduct(name, price, brand)
        if(!product) res.json({message: "Creating error"})
        return next(res.json({message: "Product succesufully created"}))
    }catch(error){
        return next(res.json({message: error.message}))
    }
}

async function deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void>{
    const {id} = req.params
    try{
        const delProd = await Product.delete({
            id: id
        })

        if(!delProd.affected) return next(res.json({message: "Product not exists"}))

        return next(res.json({message: "Product was deleted"}))
    }catch(error){
        return next(res.json({message: error.message}))
    }
}

async function updateProduct(req: Request, res: Response, next : NextFunction): Promise<void>{
    const {id} = req.params
    const {name, price} = req.body

    try{
        await modifyProduct(id, name, price)
        return next(res.json({message: "Succesufully updated"}))
    } catch(error) {
        return next(res.json({message: error.message}))
    }
}

async function searchProducts(req: Request, res: Response, next: NextFunction): Promise<void>{
    const {name, brandName} = req.query
    try{
        const products = await getProducts(name as string, brandName as string)
        return next(res.json(products))
    }catch(error){
        return next(res.json({message: error.message}))
    }
}

export{
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
}