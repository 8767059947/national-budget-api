import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        description: {
            type: String,
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User" // Admin user who created this department
        }
    },
    { timestamps: true }
);

export const Department = mongoose.model("Department", departmentSchema);
