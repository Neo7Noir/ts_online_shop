import { Router } from "express";
import { createProduct, deleteProduct, searchProducts, updateProduct } from "../controllers/productController";
import { checkRole } from "../middleware/authValid";

const routerProd = Router()

routerProd.get('/search', searchProducts)
routerProd.post('/create', checkRole([]) , createProduct)
routerProd.delete('/delete/:id', checkRole([]), deleteProduct)
routerProd.put('/update/:id', checkRole([]) , updateProduct)

export{routerProd}