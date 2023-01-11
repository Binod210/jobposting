# jobposting

 # API Contracts

# usermanagement
1. {ip}:4000/api/v1/users -> POST
	input:{
		"first_name":String,
		"last_name":String,
		"email":String,
		"password":String,
		"type":String//employer or applicant
	}
	
	output:{
		"first_name": String,
		"last_name": String,
		"email": String
		"phone": String,
		"type": String,
		"password": String,
		"is_verified": bool,
		"_id": string
	}
	
2. {ip}:4000/api/v1/users/login -> POST
	input:{
		"email": String,
		"password": String
	}
	
	output:{
		"token": String
	}
	
3. {ip}:4000/api/v1/users/{id} -> GET
	
	output:{
		"first_name": String,
		"last_name": String,
		"email": String
		"phone": String,
		"type": String,
		"password": String,
		"is_verified": bool,
		"_id": string
	}
	
# Jobs:
1. {ip}:4000/api/v1/jobs -> POST
	auth header require: Authorization : jwt token
		input:{
		"title":String,
		"description":String,
		"skills":Array,
		"experience":Number
	}
	output:{
		"title":String,
		"posted_by":String,
		"description":String,
		"skills":Array,
		"experience_level":Number,
		"_id": string
	}
	
2. {ip}:4000/api/v1/jobs/{id} -> GET
	output:{
		"title":String,
		"posted_by":String,
		"description":String,
		"skills":Array,
		"experience_level":Number,
		"_id": string
	}
	
3. {ip}:4000/api/v1/jobs/ -> GET
	output:[
		{
			"title":String,
			"posted_by":String,
			"description":String,
			"skills":Array,
			"experience_level":Number,
			"_id": string
		}
	]
	
4. {ip}:4000/api/v1/jobs/allskills -> GET
	output:[skills]

5. {ip}:4000/api/v1/jobs/skills -> GET
	input: {
		skills:Array
	}
	output:[
		{
			"title":String,
			"posted_by":String,
			"description":String,
			"skills":Array,
			"experience_level":Number,
			"_id": string
		}
	]
	
6. {ip}:4000/api/v1/jobs/skill-exp -> GET
	input: {
		skills:Array,
		experience:Number
	}
	output:[
		{
			"title":String,
			"posted_by":String,
			"description":String,
			"skills":Array,
			"experience_level":Number,
			"_id": string
		}
	]
	
7. {ip}:4000/api/v1/jobs/{id}/apply ->POST
	auth header require: Authorization : jwt token
	input:{
		skills:Array,
		cover_letter:String,
		resume:File
	}
	output:{
	applicant_id: String,
	job_id:String,
	skills:Array,
	cover_letter:String,
	resume_path:String,
	_id:String
	}
	
8. {ip}:4000/api/v1/jobs/{id}/applicants -> GET
	auth header require: Authorization : jwt token
	output:[
		{
			first_name:data.first_name,
			last_name:data.last_name,
			email:data.email,
			phone:data.phone,
			skills:el.skills,
			cover_letter:el.cover_letter,
			resume:el.resume
		}
	]
