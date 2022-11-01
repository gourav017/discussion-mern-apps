const userModel = require("../model/user.model")


const Authrization = (role) => {
 return async(req,res,next)=>{
    const {email} = req.body
    const user = await userModel.findOne({email})
    if(role.includes(user.role)){
        next()
    }
    else{
        res.send("you are not authorised")
    }
 }
}

module.exports=Authrization