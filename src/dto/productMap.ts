import { Product } from "../database/entities/product";

interface IProduct{
    id: string;
    name: string;
    price: number;
    brandName: string;
}

export class Products{
    id: string;
    name: string;
    price: number;
    brandName: string;

    constructor(obj: Product){
        this.id = obj.id
        this.name = obj.name
        this.price = obj.price
        this.brandName = obj.brand.name
    }
}