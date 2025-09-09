import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
    //Getting our token
    const token = req.cookies?.accessToken ||  req.header("Authorization")?.replace("Bearer ", "");
    if(!token)
    {
        return res.status(401).json({success: false, message: "Unauthorized Access..."});
    }
    try {
        //Decoding our token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        //finding our user
        const user = await User.findById(decodedToken._id).select("-password");

        if (!user) {
    // handles the case where the user associated with the token no longer exists.
    return res.status(401).json({ success: false, error: "User not found." });
}

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({success: false, error: "Invalid or expired Token"});
        
    }

}

//creating a middlweare that checks if the loggedin user is an admin
const isAdmin = async (req, res, next) => {
    try {
        if(req.user?.role !== 'admin')
        {
             return res.status(403).json({
                success: false,
                message: "Forbidden: Access is denied. Admin role required."
            });
        }
        next();
    } catch (error) {
         return res.status(500).json({
            success: false,
            message: "Something went wrong while checking the user role."
        });
    }
}

export {verifyJWT, isAdmin};