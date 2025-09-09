import {Department} from '../models/department.model.js'

const createDepartment = async (req, res) => {
   try {
     const {name, description} = req.body;
 
     if (!name || !description) {
             return res.status(400).json({ success: false, message: "Name and description are required." });
         }
     
     //Creating Department
     const department = await Department.create({
         name,
         description,
         createdBy: req.user._id
     });
 
 
     return res.status(201).json({
             success: true,
             message: "Department created successfully",
             department
         });
   } catch (error) {
           // Handle potential duplicate name error
        if (error.code === 11000) {
             return res.status(409).json({ success: false, message: "Department with this name already exists." });
        }
        return res.status(500).json({ success: false, message: "Internal Server Error" });
   }
}

//Controller for getting all departments
const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({
            success: true,
            departments,
            message: "Departments fetched successfully..."
    })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

//controller for updating department details
const updateDepartment = async (req, res) => {
    try {
        const {id: departmentId} = req.params;
        const {name, description} = req.body;

        if (!name || !description) {
            return res.status(400).json({ success: false, message: "Name and description are required." });
        }

        //updating the record
        const updatedDepartment = await Department.findByIdAndUpdate(departmentId, {name, description}, {new: true});

        if(!updatedDepartment)
        {
            return res.status(404).json({ success: false, message: "Record not found." });
         }

         return res.status(200).json({
            success: true,
            department: updatedDepartment,
            message: "Record Updated successfully..."
         })
    }

     catch (error) {
         return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

//controller to delete department
const deleteDepartment = async (req, res) => {
    try {
        const { id: departmentId } = req.params;

        const department = await Department.findByIdAndDelete(departmentId);

        if (!department) {
            return res.status(404).json({ success: false, message: "Department not found." });
        }

        return res.status(200).json({
            success: true,
            message: "Department deleted successfully."
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export {createDepartment, getAllDepartments, updateDepartment, deleteDepartment};