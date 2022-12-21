import { Router } from "express";
import { routerAuth } from "./authRoute";
import { routerBrand } from "./brandRoute";
import { routerProd } from "./productRoute";

const router = Router()

router.use('/auth', routerAuth)
router.use('/product', routerProd)
router.use('/brand', routerBrand)

export{router}