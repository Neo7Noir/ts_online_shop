import { UpdateResult } from "typeorm"
import { AppDataSource } from "../database/dbConnections"
import { Brand } from "../database/entities/brand"

async function findBrand(name: string): Promise<Brand>{
    const brand = await Brand.findOne({where : {
        name: name
    }
})
    return brand
}

async function addBrand(name: string): Promise<Brand> {
    try{
        const brand = await findBrand(name)

        if(brand) throw new Error("This brand already exists")

        const newBrand = Brand.create({
            name: name
        })
        await newBrand.save()

        return newBrand
    }catch(error){
        throw new Error(error.message)
    }
}

async function modifyBrand(id: string, name: string): Promise<UpdateResult> {
    try{
        const brandRepository = AppDataSource.getRepository(Brand)

        const newbrand = await brandRepository.update({
            id: id
        }, {
            name: name
        })
        return newbrand
    }catch(error){
        throw new Error(error.message)
    }
    
}

export{
    findBrand,
    addBrand,
    modifyBrand
}