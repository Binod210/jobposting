
const auth = require('../authentication/authentication')
const constant = require('../constants/status.code')
const errModel = require('../models/error.models')
const jobService = require('../services/jobs.services')

exports.CreateJobs=(req,res)=>{
    var authToken=req.headers['authorization']
    try{
        var authDetails=auth.VerifyJWT(authToken)
        if(!req.body){
            return res.status(constant.EMPTY_FIELD).send(errModel.errorMessage("please provide required fields"))
        }
        jobService.postJob(req.body,authDetails.id,res)
    
    }catch(ex){
        return res.status(constant.FORBIDDEN).send(errModel.errorMessage("Please login to post job"))
    }

}

exports.ViewJob=(req,res)=>{
    var id=req.params['id']
    jobService.JobDetails(id,res)

}

exports.findJobsBySkill=(req,res)=>{
    var skills=req.body.skills
    jobService.SearchBySkills(skills,res)
}

exports.findAllJobs=(req, res)=>{
    jobService.findJobs(res)

}

exports.getAllSkills=(req, res)=>{
    jobService.GetSkills(res)
}

exports.applyJob=(req, res)=>{
    var authToken=req.headers['authorization']
    try{
    var authDetails=auth.VerifyJWT(authToken)
    var jobId=req.params['job_id']
    if (!req.body){
        return res.status(constant.EMPTY_FIELD).send(errModel.errorMessage("please provide all required fields"))
    }
    jobService.applyJob(jobId,req.body,authDetails.id,res)
    
    }catch(ex){
        return res.status(constant.FORBIDDEN).send(errModel.errorMessage("Please login to apply"))
    }

}

exports.getAllApplicants=(req,res)=>{
    var authToken=req.headers['authorization']
    try{
        var authDetails=auth.VerifyJWT(authToken)
        var jobId=req.params['id']
        jobService.GetApplicants(jobId,authDetails.id,res)
    }catch(ex){
        return res.status(constant.FORBIDDEN).send(errModel.errorMessage("Please login to view applicant details"))
    }
}

exports.findJobsBySkillAndExperience=(req,res)=>{
    var skills = req.body.skills
    var exp = req.body.experience
    jobService.SearchBySkillsandExperience(skills,exp,res)
}
