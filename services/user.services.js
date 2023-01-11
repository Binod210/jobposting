const constant = require('../constants/status.code')
const errModel = require('../models/error.models')
const User = require('../models/user.model.js')
const auth = require('../authentication/authentication')
const crypto = require('crypto')
const userCollection = require('../db/user.collection')

exports.CreateUser= (userDecode, res)=>{
    if(!userDecode.first_name || userDecode.first_name===""){
        console.log(constant.EMPTY_FIELD)
        return res.status(constant.EMPTY_FIELD).send(errModel.errorMessage("First name could not be null"))
    }

    if(!userDecode.last_name || userDecode.last_name===""){
        return res.status(constant.EMPTY_FIELD).send(errModel.errorMessage("Last name could not be null"))
    }

    if (!userDecode.email || userDecode.email===""){
        return res.status(constant.EMPTY_FIELD).send(errModel.errorMessage("email could not be nul"))
    }

    if (!userDecode.password || userDecode.password===""){
        return res.status(constant.EMPTY_FIELD).send(errModel.errorMessage("password could not be null"))
    }
    if (userDecode.password.length<6){
        return res.status(constant.FORBIDDEN).send(errModel.errorMessage("password should be atleast 6 character long"))
    }

    if(!userDecode.type || userDecode.type==""){
        return res.status(constant.EMPTY_FIELD).send(errModel.errorMessage("User type could not be null"))
    }

    const user = new User({
        first_name:userDecode.first_name,
        last_name:userDecode.last_name,
        email:userDecode.email,
        password:crypto.createHash("sha1").update(userDecode.password,"binary").digest("hex"),
        type:userDecode.type,
        phone:userDecode.phone?userDecode.phone:""
    })

    user.save().then(data=>{
        return res.status(constant.SUCCESS).send(data)
    }).catch(err=>{
        return res.status(constant.SERVER_ERROR).send(errModel.errorMessage(err))
    });
   
    

}

exports.Login = (userDecode, res)=>{
    if (!userDecode.email || !userDecode.password){
        return res.status(constant.EMPTY_FIELD).send(errModel.errorMessage("email or password couldnot be empty"))
    }
    //var password=crypto.createHash("sha1").update(userDecode.password,"binary").digest("hex")
    User.findOne({email:userDecode.email,password:userDecode.password},(err,docs)=>{
        if(err){
            console.log("error in finding ", err)
            return res.status(constant.SERVER_ERROR).send(errModel.errorMessage("error in db while finding user"))
        }else{
            if (!docs){
                return res.status(constant.FORBIDDEN).send(errModel.errorMessage("username or password wrong"))
            }
            var token = auth.CreateJWT(docs.id,docs.email,docs.type)
            return res.status(constant.SUCCESS).send({token:token})
        }
    })
    
}

exports.UserDetails=(id,res)=>{
    if (id==""){
        return res.status(constant.EMPTY_FIELD).send(errModel.errorMessage("id should not be null"))
    }
    User.findById(id).then(data=>{
        if (!data){
            return res.status(constant.FORBIDDEN).send(errModel.errorMessage("user data not found"))
        }
        return res.status(constant.SUCCESS).send(data)
    }).catch(err=>{
        return res.status(constant.SERVER_ERROR).send(errModel.errorMessage("error in finding user"))
    })

}

