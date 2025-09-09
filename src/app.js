import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

//CORS Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

import authRouter from './api/routes/auth.routes.js'
import departmentRouter from './api/routes/department.routes.js'
import budgetRouter from './api/routes/budget.routes.js'

app.use("/api/v1/users", authRouter);

app.use("/api/v1/departments", departmentRouter);

app.use("/api/v1/budgets", budgetRouter);

app.get("/", (req,res) => {
    res.send("National Budget Api is Running...");
})

export {app};