const express = require('express')
const router = express.Router()
const controller=require('../controllers/user.controller')

router.post("/",controller.CreateUser)

router.post("/login",controller.Login)
router.post("/verify",controller.Verify)
router.get("/:id",controller.GetUserDetails)

module.exports = router