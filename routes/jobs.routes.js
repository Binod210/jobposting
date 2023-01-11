
const express = require('express')
const controller = require('../controllers/jobs.controllers')
const router = express.Router()

router.post("/",controller.CreateJobs)

router.get("/",controller.findAllJobs)
router.get("/allskills",controller.getAllSkills)

router.get("/skills",controller.findJobsBySkill)
router.get("/skill-exp",controller.findJobsBySkillAndExperience)

router.get("/:id",controller.ViewJob)

router.get("/:id/applicants", controller.getAllApplicants)

router.post("/:id/apply", controller.applyJob)

module.exports = router