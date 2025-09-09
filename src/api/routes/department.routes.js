import express from 'express'
import { isAdmin, verifyJWT } from '../middlewares/auth.middleware.js'
import { createDepartment, deleteDepartment, getAllDepartments, updateDepartment } from '../controllers/department.controller.js';

const router = express.Router();

//creating department routes
router.route("/addDepartment").post(verifyJWT, isAdmin, createDepartment);

router.route("/getDepartments").get(verifyJWT, getAllDepartments);

router.route("/:id")
    .put(verifyJWT, isAdmin, updateDepartment)      
    .delete(verifyJWT, isAdmin, deleteDepartment);


export default router;