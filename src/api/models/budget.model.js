
import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema(
    {
        department: {
            type: Schema.Types.ObjectId,
            ref: "Department", // Link from department model
            required: true
        },
        financialYear: {
            type: String, // for ex -  "2025-2026"
            required: true,
            trim: true
        },
        totalAllocation: {
            type: Number,
            required: true,
            default: 0
        },
        // For tracking expenditure
        expenditures: [
            {
                amount: { type: Number, required: true },
                description: { type: String, required: true },
                date: { type: Date, default: Date.now }
            }
        ],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

export const Budget = mongoose.model("Budget", budgetSchema);