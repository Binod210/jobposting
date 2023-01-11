const constant = require('../constants/status.code')
const errModel = require('../models/error.models')
const auth = require('../authentication/authentication')
const Job = require('../models/job.model')
const Applicant = require('../models/applicant.models')
const User = require('../models/user.model')
const skills=require('../constants/skills')

exports.postJob=(job,userId, res)=>{
    if(job.title==""){
        return res.status(constant.EMPTY_FIELD).send("title couldnot be empty")
    }

    if (job.posted_by==""){
        return res.status(constant.EMPTY_FIELD).send("posted by couldnot be empty")
    }

    var job = new Job({
        title:job.title,
        description:job.description,
        posted_by:userId,
        skills:job.skills,
        experience_level:job.experience

    })
    job.save().then(data=>{
        return res.status(constant.SUCCESS).send(data)
    }).catch(ex=>{
        return  res.status(constant.SERVER_ERROR).send(errModel.errorMessage(ex))
    })
}

exports.findJobs=(res)=>{
    Job.find({},(err,jobs)=>{
        if (err){
            return res.status(constant.SERVER_ERROR).send(errModel.errorMessage(err))
        }
        return res.status(constant.SUCCESS).send(jobs)
    })
}

exports.JobDetails=(id, res)=>{
    if (id==""){
        return res.status(constant.EMPTY_FIELD).send(errModel.errorMessage("id should not be null"))
    }
    Job.findById(id).then(data=>{
        if (!data){
            return res.status(constant.FORBIDDEN).send(errModel.errorMessage("Job data not found"))
        }
        return res.status(constant.SUCCESS).send(data)
    }).catch(err=>{
        return res.status(constant.SERVER_ERROR).send(errModel.errorMessage("error in finding Job"+err))
    })
}

exports.SearchBySkills=(skills,res)=>{
    if (!skills){
        return res.status(cosntant.EMPTY_FIELD).send(errModel.errorMessage("skills could not be empty"))
    }
    Job.find({skills:{"$in":skills}},(err,data)=>{
        if(err){
            return res.status(constant.SERVER_ERROR).send(errModel.errorMessage(err))
        }
        return res.status(constant.SUCCESS).send(data)
        
    })

}

exports.SearchBySkillsandExperience=(skills, exp, res)=>{
    if(!skills){
        return res.status(cosntant.EMPTY_FIELD).send(errModel.errorMessage("skills could not be empty"))
    }
    Job.find({skills:{"$in":skills},experience:{"$lte":exp}},(err,data)=>{
        if(err){
            return res.status(constant.SERVER_ERROR).send(errModel.errorMessage(err))
        }
        return res.status(constant.SUCCESS).send(data)
    })
}

exports.GetSkills=(res)=>{
    return res.status(SUCCESS).send(skills.skills)
}

exports.GetApplicants=(jobId,userId,res)=>{
    if(!jobId){
        return res.status(cosntant.EMPTY_FIELD).send(errModel.errorMessage("JobId could not be empty"))
    }
    Job.findById(jobId).then(data=>{
        if(data){
            if(data.posted_by===userId){
                Applicant.find({job_id:jobId},(err,data)=>{
                    if(err){
                        return res.status(cosntant.SERVER_ERROR).send(errModel.errorMessage(err))
                    }
                    var applicants=[]
                    data.array.forEach(el => {
                        User.findById(el.applicant_id).then(data=>{
                            if (data){
                                var applicant={
                                    first_name:data.first_name,
                                    last_name:data.last_name,
                                    email:data.email,
                                    phone:data.phone,
                                    skills:el.skills,
                                    cover_letter:el.cover_letter,
                                    resume:el.resume_path
                                }
                                applicants.push(applicant)
                            }
                        }).catch(ex=>{
                            console.log("exception while finding user",ex)
                        })
                    });
                    return res.status(constant.SUCCESS).send(applicants)
                })
            }else{
                return res.status(constant.FORBIDDEN).send(errModel.errorMessage("You are not authorized "))
            }
        }else{
            return res.status(constant.SERVER_ERROR).send(errModel.errorMessage("couldnot field job"))
        }

    }).catch(ex=>{
        return res.status(constant.SERVER_ERROR).send(errModel.errorMessage(ex))
    })
   
    
}

exports.applyJob=(jobId,application,userid,res)=>{
    if(application.job_id==""){
        return res.status(cosntant.EMPTY_FIELD).send(errModel.errorMessage("jobId could not be empty"))
    }
    var application = new Applicant({
        applicant_id:userid,
        job_id:jobId,
        skills:application.skills,
        cover_letter:application.cover_letter

    })
    application.save().then(data=>{
        return res.status(constant.SUCCESS).send(data)
    }).catch(err=>{
        return res.status(constant.SERVER_ERROR).send(errModel.errorMessage(err))
    })
}

