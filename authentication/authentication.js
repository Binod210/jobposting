const jwt = require('jsonwebtoken')
const config = require('../config/env.config')

const secret = config.shareSecrte
exports.CreateJWT=(id,username, role) =>{
    var token = jwt.sign({id:id,user:username, role:role},secret)
    return token
}

exports.VerifyJWT=(token)=>{
    return jwt.verify(token,secret)

}

exports.GetRoleFromJWT=(token)=>{

}