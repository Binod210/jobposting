const userService = require('../services/user.services.js')

exports.CreateUser=(req,res)=>{
    console.log("CreateUser called")

    if(!req.body){
        return res.status(400).send({message:"Please provide all fields"})
    }
    userService.CreateUser(req.body, res)

    

}

exports.Login=(req,res)=>{
    console.log("Login Called ")
    userService.Login(req.body,res)
}

exports.Verify=(req,res)=>{
    console.log("Verify called")
}

exports.GetUserDetails=(req,res)=>{
    var id= req.params['id']
    userService.UserDetails(id,res)
    console.log("GetUserDetails called")
}