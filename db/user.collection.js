
const User = require('../models/user.model.js')

exports.findByEmailAndPassword= (email, password)=>{
     return User.find({'email':email, 'password':password})
    

}