import express from "express"
import { register,login, createEmployee, getAllEmployees, deleteEmployee, getEmployeeById, editEmployee } from "../controllers/userController.js";
import { isLogged,checkAdmin } from "../middleware/authMiddleware.js";
const router = express.Router()


router.post("/register",register);
router.post("/login",login);
router.post("/create",isLogged,checkAdmin,createEmployee)
router.get ("/getall",isLogged,checkAdmin,getAllEmployees)
router.patch("/edit/:id",isLogged,editEmployee)
router.delete("/delete/:id",isLogged,checkAdmin,deleteEmployee)
router.get("/byid/:id",isLogged,getEmployeeById)


export default router