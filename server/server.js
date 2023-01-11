const express = require('express')
const bodyParser = require('body-parser')
const dbConfig = require('../config/db.config.js');
const env = require('../config/env.config.js')
const userRoutes = require('../routes/user.routes')
const jobsRoutes = require('../routes/jobs.routes')

const app = express()

const port=env.port;

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,{useNewUrlParser:true}).then(()=>{
    console.log("Successfully connected to the database");
}).catch(err=>{
    console.log("error in db connection ", err);
    process.exit()
})

app.get('/',(req,res)=>{
    res.json({"message":"hello world"});
});

app.use('/api/v1/users',userRoutes)
app.use('/api/v1/jobs', jobsRoutes)

exports.runServer=()=>{
    app.listen(port, ()=>{
        console.log(`Node server is listening on port ${port}`);
    })
}


module.exports