import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm"
import { Brand } from "./brand";

@Entity('product')
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column({
        unique : true,
    })
    name : string;

    @Column()
    price: number;

    @ManyToOne(() => Brand, (brand) => brand.product)
    brand: Brand

}