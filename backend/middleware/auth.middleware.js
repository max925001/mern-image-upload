// import { token } from "morgan"
import jwt from "jsonwebtoken"
import AppError from "../utilis/error.util.js"

const isLoggedIn = async (req ,res, next) =>{

    const {token} = req.cookies
    
    console.log("token",token)
    if(!token){
       
        return next(new AppError('Unauthenticated please login',400))
    }
    //console.log(token)

const userDetails =  await jwt.verify(token,process.env.JWT_SECRET)
console.log(userDetails)
req.user = userDetails;
console.log("userdetails",req.user)
next()
}


export { isLoggedIn}