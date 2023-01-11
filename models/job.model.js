const mongoose = require('mongoose')

const JobScheme = mongoose.Schema({
    title:String,
    posted_by:String,
    description:String,
    skills:{type:Array, default:[]},
    experience_level:{type:Number,default:0}

},{
    timestamp:true
});

module.exports = mongoose.model('Job', JobScheme);