const mongoose = require('mongoose')

const ApplicantScheme= mongoose.Schema({
    applicant_id:String,
    job_id:String,
    skills:{type:Array,default:[]},
    cover_letter:String,
    resume_path:String
},{
    timestamp:true
})

module.exports= mongoose.model('Applicant',ApplicantScheme);