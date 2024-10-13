import User from "../models/userModels.js"
import AppError from "../utilis/error.util.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
// import crypto from 'crypto'
import { config } from "dotenv"
config()
const cookieOptions = {
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production' ? true : false,
    // // sameSite:'None',
    // // secure: true

}
const register =async (req ,res ,next) =>{
const {fullName ,email,password} =req.body
if(!fullName || !email || !password){

  return next( new AppError('All fields are required' ,400)


)}

const userExists = await User.findOne({
    email
})
if(userExists){
return next(new AppError('Email already exits' ,400))

}
const user = await User.create({

    fullName,
    email,
    password,
    avatar:{
        public_id: email,
        secure_url:'https://res.cloudinary.com/dz6c061ci/image/upload/v1705403922/lms/ruy8ak49bzlh3n8wulyv.jpg'
    }

})

if(!user){
    return next(new AppError('user registration failed please try again' ,400))
}

// TODO file upload

if( "file",req.file){
    console.log(req.file)
    try{

        const result = await cloudinary.v2.uploader.upload(req.file.path ,{
            folder: 'lms',
            width:250,
            height:250,
            gravity:'faces',
            crop:'fill'
        })

if(result){
    user.avatar.public_id = result.public_id
    user.avatar.secure_url = result.secure_url

//remove file from server

fs.rm(`uploads/${req.file.filename}`)



}


    }catch(e){

return next(
    new AppError(error || 'file not upload ,please try again' ,500)
)


    }
}


await user.save();
user.password = undefined;

const token = await user.generateJWTtoken()
res.cookie('token' ,token ,cookieOptions)


res.status(200).json({
    success: true,
    message:'user registered successfully',
    user,
})



}

const login  = async (req,res,next) =>{


    try{



        const {email ,password} = req.body

if(!email || !password)

{
    
    return next(new AppError('All fields are required' ,400))


}
const user = await User.findOne({
    email
}).select('+password') // ye ish liye kiya hai taki password bhi mile data base se
if(!user || !user.comparePassword(password)){

return next(new AppError('Email or password does not match',400))

}

const token = await user.generateJWTtoken()
user.password = undefined
res.cookie('token' ,token ,cookieOptions)
res.status(200).json({
success: true,
message:'User Login Successfully',
user,

})



    }catch(e){
return next(new AppError(e.message,500))


    }


}




const logout = (req,res) =>{

res.cookie('token' ,null ,{
    secure:true,
    maxAge:0,
    httpOnly:true
})

res.status(200).json({
    success:true,
    message:'User Logout Successfully'

})

}



const getProfile =  async(req,res,next) =>{

    const userId = req.user.id;
try{

   
    //console("userid",userId)
    
const user = await User.findById(userId)
res.status(200).json({
    success:true,
    message:'user details',
    user
})
}catch(e){
return next(new AppError('failed to fetch profile'))

}

}


const updateUser = async (req ,res ,next) =>{
    const {fullName} = req.body
    const {id} = req.params
    const user = await User.findById(id)
    
    if(!user){
    return next(new AppError("Invalid user id or user does not exits"))
    
    
    }
    if(fullName){
    user.fullName = fullName
    
    }
    if(req.file){
    
    await cloudinary.v2.uploader.destroy(user.avatar.public_id)
    
    try{
    const result = await cloudinary.v2.uploader.upload(req.file.path ,{
    folder:'lms',
    width:250,
    height:250,
    gravity:'faces',
    crop:'fill'
    
    
    
    })
    
    if(result){
        user.avatar.public_id = result.public_id
        user.avatar.secure_url =result.secure_url
        fs.rm(`uploads/${req.file.filename}`)
    }
    
    
    }catch(error){
        new AppError(error || 'file not uploades , please try again' ,400)
    
    
    }
    
    
    await user.save()
    res.status(200).json({
        success:true,
        message:'User details update successfully'
    })
    
    }
    
    }


    const profileViewCount = async (req, res) => {
        const { userId } = req.params;  // ID of the profile being viewed
            const viewId = req.user.id;
           
        try {
               
            if (userId === viewId) {
                return res.status(400).json({
                    success: false,
                    message: "You cannot increase views on your own profile."
                });
            }
    
            // Find the profile being viewed
            const userProfile = await User.findById(userId);
    
            if (!userProfile) {
                return res.status(404).json({
                    success: false,
                    message: "User profile not found."
                });
            }
    
            // Increment the profile view count
            userProfile.profileView += 1;
    
            // Save the updated profile
            const data =await userProfile.save();
    
            res.status(200).json({
                success: true,
                message: "Profile view count updated successfully",
                data:data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server error",
                error: error.message
            });
        }
    };


    const getAllUser = async (req, res) => {
        try {
          // Query the database to find all users
          const users = await User.find({});
          
          // Send the list of users in the response
          return res.status(200).json({
            success: true,
            data: users,
          });
        } catch (error) {
          // Handle any errors that occur during the request
          return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message,
          });
        }
      };
export {register,login,logout,getProfile ,updateUser,profileViewCount ,getAllUser}