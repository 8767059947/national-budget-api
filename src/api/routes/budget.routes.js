import { Router } from "express";
import {
    createBudget,
    getBudgetsByDepartment,
    updateBudget,
    deleteBudget,
    addExpenditure
} from "../controllers/budget.controller.js";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// --- GENERAL (LOGGED-IN USER) ROUTES ---
router.route("/department/:departmentId").get(verifyJWT, getBudgetsByDepartment);

// --- ADMIN ONLY ROUTES ---
router.use(verifyJWT, isAdmin); // Apply auth and admin check to all routes below this line

router.route("/").post(createBudget);

router.route("/:budgetId")
    .put(updateBudget)
    .delete(deleteBudget);

router.route("/:budgetId/expenditures").post(addExpenditure);


export default router;