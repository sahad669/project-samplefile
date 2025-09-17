import express from "express"
import { getAllDepartment,addDepartment,deleteDepartment } from "../controllers/departmentController.js";
import { isLogged,checkAdmin } from "../middleware/authMiddleware.js";
const router = express.Router()

router.get('/',isLogged,checkAdmin,getAllDepartment)
router.post("/",isLogged,checkAdmin,addDepartment);
router.delete("/:id",isLogged,checkAdmin,deleteDepartment);

export default router