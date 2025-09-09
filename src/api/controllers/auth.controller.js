import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';


// register user controller
 const registerUser = async (req,res) => {
    try {
        const {username, email, password, role} = req.body;

        //Checking for null or empty values
        if(!username || !email || !password)
        {
            return res.status(400).json({
                success : false, message: "Username, email and password are required.."
            })
        }

        //check if user already exists
        const existingUser = await User.findOne({$or: [{username}, {email}]});
        if(existingUser)
        {
            return res.status(409).json({
                success: false, message: "User already exists.."
            })
        }

        //Creating User
        const user = await User.create({
            username,
            email,
            password,
            role
        })

        //Removing password from the response object
        const createdUser = await User.findById(user._id).select("-password");

         if (!createdUser) {
            return res.status(500).json({ message: "Something went wrong while registering the user" });
        }

         // 5. Send success response
        return res.status(201).json({ 
            success: true,
            message: "User registered successfully",
            user: createdUser 
        });

    } catch (error) {
         console.error("Error in user registration:", error);
        return res.status(500).json({success: false, message: "Internal Server Error" });
        
    }

}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        //checking for both the fields
        if(!email || !password)
        {
            return res.status(400).json({success: false, message: "Username and Email are required!"});
        }

        //finding user
        const user = await User.findOne({email});
        if(!user)
        {
            return  res.status(404).json({success: false, message: "User does not exist..."});
        }

        //checking for valid password 
        const isPasswordValid = await user.isPasswordCorrect(password);
        if(!isPasswordValid)
        {
            return res.status(401).json({success: false, message: "Invalid Credentials"});
        }

         // 5. Create a new object for the response to hide the password
        const loggedInUser = await User.findById(user._id).select("-password");

        //Generating JWT Token 
        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d' // Token expires in 1 day
            }
        );

        // Define cookie options
 const options = {
    httpOnly: true, // Makes the cookie inaccessible to client-side JS
    secure: true    // Ensures cookie is sent over HTTPS only
};

        return res.status(200)
        .cookie("accessToken", token, options) //setting the cookie
        .json({
            success: true,
            user: loggedInUser,
            token: token
        })
    } catch (error) {
        console.error("Error in logging user:", error);
        return res.status(500).json({success: false, message: "Internal Server Error" });
    }
}

//controller for loggin out
const logoutUser = async (req, res) => {
   try {
      const options = {
     httpOnly: true, // Makes the cookie inaccessible to client-side JS
     secure: true    // Ensures cookie is sent over HTTPS only
 };
 
 return res.status(200)
 .clearCookie("accessToken", options) //clearing our cookie
 .json({success: true, message: "User logged out successfully!"});
   } catch (error) {
     console.error("Error in logging out user:", error);
        return res.status(500).json({success: false, message: "Internal Server Error" });
         }
}

const getUserProfile = async(req, res) => {
    const user = req.user;

     return res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        user: user
    });
}

export {registerUser, loginUser, getUserProfile, logoutUser};
