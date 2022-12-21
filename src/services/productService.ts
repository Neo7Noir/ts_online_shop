import { ILike, SimpleConsoleLogger, UpdateResult } from "typeorm";
import { AppDataSource } from "../database/dbConnections";
import { Brand } from "../database/entities/brand";
import { Product } from "../database/entities/product";
import { Products } from "../dto/productMap";
import { findBrand } from "./brandService";

async function findProduct(name: string): Promise<Product>{
    
    const productRepository = AppDataSource.getRepository(Product)

    const product = await productRepository.findOne({
        where: {
            name: name
        }
    })
    return product
}


async function addProduct(name: string, price: number, brandname: string):Promise<Product> {
    try{
        const product = await findProduct(name)
        const brand = await findBrand(brandname)

        if(product) throw new Error("This product already exists")

        const newProduct = Product.create({
            name: name,
            price: price,
            brand: brand
        })
        await newProduct.save()

        return newProduct
    }catch(error){
        throw new Error(error.message)
    }
}

async function modifyProduct(id: string, name: string, price: number): Promise <UpdateResult> {
    try {
        const productRepository = AppDataSource.getRepository(Product)

        const newProduct = await productRepository.update({
            id
        }, {
            name,
            price
        })
        return newProduct
    } catch(error) {
        throw new Error(error.message)
    }
}

async function getProducts(name: string, brandName: string): Promise<Products[]> {
    let filter

    if (!brandName && name) {
        filter = {
            relations: {
                brand : true
            },
            select: {
                brand: {
                    name: true
                }
            },
            where: {
                name: ILike(`%${name}%`) 
            }
        }
    }

    if (!name && brandName) {
        filter = {
            relations: {
                brand : true
            },
            select: {
                brand: {
                    name: true
                }
            },
            where: {
                brand:{name: ILike(`%${brandName}%`)}
            }
        }
      
    }

    if (name && brandName) {
        filter = {
            relations: {
                brand : true
            },
            select: {
                brand: {
                    name: true
                }
            },
            where: {
                name: ILike(`%${name}%`),
                brand:{name: ILike(`%${brandName}%`)}
            }
        }
    }

    const productRepository = AppDataSource.getRepository(Product)
    let products : Product[] = await productRepository.find(filter)

    return products.map(x => new Products(x))   
}

export {
    findProduct,
    addProduct,
    modifyProduct,
    getProducts
}