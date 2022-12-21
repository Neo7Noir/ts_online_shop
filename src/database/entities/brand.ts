import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import { Product } from "./product";

@Entity('brand')
export class Brand extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column({
        unique : true,
    })
    name : string;

    @OneToMany(() => Product, (product) => product.brand)
    product: Product[]

}