import { Budget } from "../models/budget.model.js";
import { Department } from "../models/department.model.js";



//controller for creating a new budget record
const createBudget = async (req, res) => {
    try {
        const {departmentId, financialYear, totalAllocation} = req.body;
    
        if(!departmentId || !financialYear || !totalAllocation)
        {
            return res.status(400).json({
                success: false,
                message: "All Fields are required..."
            })
        }
    
        const department = await Department.findById(departmentId);
    
        if(!department)
        {
            return res.status(404).json({
                success: false,
                message: "Record not found.."
            });
        }

         //Check for duplicate budget entry
        const existingBudget = await Budget.findOne({ department: departmentId, financialYear });
        if (existingBudget) {
            return res.status(409).json({
                success: false,
                message: `A budget for ${department.name} for the financial year ${financialYear} already exists.`
            });
        }
    
        const budget = await Budget.create({
            department: departmentId,
            financialYear,
            totalAllocation,
            createdBy: req.user._id
        })
    
        return res.status(201).json({
            success: true,
            budget: budget,
            message:"Budget created successfully"
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

//getting all budgets for department
const getBudgetsByDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;

        // Check if the department exists
        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({ success: false, message: "Department not found." });
        }

        const budgets = await Budget.find({ department: departmentId }).populate("department", "name");

        return res.status(200).json({
            success: true,
            message: `Budgets for ${department.name} fetched successfully.`,
            budgets
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//updating budget
const updateBudget = async (req, res) => {
    try {
        const { budgetId } = req.params;
        const { totalAllocation } = req.body;

        if (!totalAllocation || totalAllocation <= 0) {
            return res.status(400).json({ success: false, message: "A valid total allocation is required." });
        }

        const updatedBudget = await Budget.findByIdAndUpdate(
            budgetId,
            { totalAllocation },
            { new: true }
        );

        if (!updatedBudget) {
            return res.status(404).json({ success: false, message: "Budget not found." });
        }

        return res.status(200).json({
            success: true,
            message: "Budget updated successfully.",
            budget: updatedBudget
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//deleting budget
const deleteBudget = async (req, res) => {
    try {
        const { budgetId } = req.params;

        const deletedBudget = await Budget.findByIdAndDelete(budgetId);

        if (!deletedBudget) {
            return res.status(404).json({ success: false, message: "Budget not found." });
        }

        return res.status(200).json({
            success: true,
            message: "Budget deleted successfully."
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//adding expense record for particular budget
const addExpenditure = async (req, res) => {
   try {
     const {budgetId} = req.params;
     const {amount, description} = req.body;
 
     if(!description || !amount || amount <= 0)
     {
          return res.status(400).json({ success: false, message: "Description and a valid amount is required." });
     }
 
     const budget = await Budget.findById(budgetId);
     if(!budget)
     {
         return res.status(404).json({
             success: false,
             message: "Record not found..."
         })
     }
 
     //pushing new object into the array
     budget.expenditures.push({
         amount,
         description
     });
 
     //saving modified document
     const updatedBudget = await budget.save();
 
     return res.status(200).json({
             success: true,
             message: "Expenditure added successfully.",
             budget: updatedBudget
         });
   } catch (error) {
     return res.status(500).json({ success: false, message: "Internal Server Error" });
   }

}


export {createBudget, getBudgetsByDepartment, updateBudget, deleteBudget, addExpenditure};