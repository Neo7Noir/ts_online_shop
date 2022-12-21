import { Router } from "express";
import { createBrand, deleteBrand, updateBrand } from "../controllers/brandController";
import { checkRole } from "../middleware/authValid";

const routerBrand = Router()

routerBrand.post('/create', checkRole([]), createBrand)
routerBrand.delete('/delete/:id', checkRole([]), deleteBrand)
routerBrand.put('/update/:id', checkRole([]), updateBrand)

export{routerBrand}