import { DataSource } from "typeorm";
import { Brand } from "./entities/brand";
import { Product } from "./entities/product";
import { User } from "./entities/user";

export const AppDataSource = new DataSource({
    type : "mysql",
    host : "localhost",
    username : "root",
    password : "AnTrOpOlOgIa567",
    database : "init_task",
    entities : [User, Brand, Product],
    synchronize : true,
})