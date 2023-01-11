const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    phone:String,
    type:String,
    password:String,
    is_verified: {type:Boolean,default:false}

},{
    timestamp:true
});

module.exports = mongoose.model('User', UserSchema);