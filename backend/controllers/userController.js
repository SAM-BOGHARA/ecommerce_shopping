const ErrorHandler = require("../utils/errorHandle");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
const { log } = require("console");
// const { request } = require("../app");x

// Register a User
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{

    const {name, email, password} = req.body;
    


    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample ID",
            url:"profilePicUrl"
        }
    });

    sendToken(user, 201, res);
})


// Login User
exports.loginUser = catchAsyncErrors (async (req, res, next)=>{

    const {email,password} = req.body;

    // checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password", 400))
    }

    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    
    sendToken(user, 200, res);

})

// Logout User
exports.logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })



    res.status(200).json({
        success:true,
        message:"logged Out Successfully"
    })
})


// Forgot Password
exports.forgotPassword = catchAsyncErrors(async(req, res, next)=>{

    const user = await User.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }


    // Get Reset Password Token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false})


    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your Password Reset Token is :- \n\n${resetPasswordUrl} \n\nIf you have not requested this
    email the, please ignore it.`

    try{

        await sendEmail({

            email:user.email,
            subject:`Buy-It-Now Password Recovery`,
            message
        })

        res.status(200).json({
            success:true,
            message:`Email Sent to ${user.email} successfully`
        })

    } catch(error){
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({validateBeforeSave: false})

        return next(new ErrorHandler(error.message, 500))
    }
})


// Reset Password
exports.resetPassword = catchAsyncErrors(async(req, res, next)=>{

    // creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400))
    }


    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);



})


// Get User Details
exports.getUserDetails = catchAsyncErrors(async(req, res, next)=>{

    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})


// Update User Password
exports.updatePassoword = catchAsyncErrors(async(req, res, next)=>{

    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",401))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't match",401))
    }

    user.password = req.body.newPassword

    await user.save()

    sendToken(user, 200, res)
})

// Update User Profile
exports.updateProfile = catchAsyncErrors(async(req, res, next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true
    })
})




// Get All User's (Admin)
exports.getAllUsers = catchAsyncErrors(async(req, res, next)=>{

    const users = await User.find()

    res.status(200).json({
        success:true,
        users
    })
})


// Get Single User's (admin)
exports.getUser = catchAsyncErrors(async(req, res, next)=>{
    
    const user = await User.findById(req.params.id)


    if(!user){
        return next(new ErrorHandler(`User Does not exist ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user
    })
})


// Update User Role -- ADMIN
exports.updateUserRole = catchAsyncErrors(async(req, res, next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true
    })
})

// Delete User -- ADMIN
exports.deleteUser = catchAsyncErrors(async(req, res, next)=>{

    const user = await User.findById(req.params.id)
    // We Will remove cloudinary later

    if(!user){
        return next(new ErrorHandler(`User Does not exist with Id: ${req.params.id}`))
    }

    await user.deleteOne()


    res.status(200).json({
        success: true,
        message:"User Deleted Successfully"
    })
})