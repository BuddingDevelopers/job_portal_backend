let express = require("express");
let User = require("../models/user");
let EventHandler = require("../helpers/EventHandler");

let router = express.Router();

router.use((request, response, next) => {
    console.log("Time: "+Date.now());
    next();
});

router.post("/", (request, response)=>{
    if(!request.body){
        EventHandler.handleError(response, "Incomplete input parameters");
    }

    let params = request.body;
    let query = {
        email : params.email
    }

    User.findOne(query, (error, usr) => {
        if(error) EventHandler.handleError(response, error);
        if(usr !== null){
            EventHandler.handleError(response, "Email already registered. Please try login");
            return;
        }
        let user = new User({
            firstName : params.firstName,
            lastName : params.lastName,
            email: params.email,
            phone: params.phone,
            altPhone: params.altPhone,
            password: params.password,
            role: params.role,
            isActive: true,
            isVerified: false,
            profile : {}
        });
        
        user.save((error) => {
            if(error) EventHandler.handleError(response, error);
            EventHandler.sendSuccess(response, "User inserted successfully");
        });
    });
});

router.post("/profile", (request, response) => {
    if(!request.body){
        EventHandler.handleError(response, "Incomplete input parameters");
    }
    let params = request.body;
    let profileObj = {
        "profile.personalDetails" : params.personalDetails,
        "profile.skills" : params.skills,
        "profile.experienceDetails": params.experienceDetails,
        "profile.educationDetails": params.educationDetails
    };
    
    let query = {_id : params.userId};

    User.update(query, profileObj, (error)=>{
        if(error) EventHandler.handleError(response, error);
        EventHandler.sendSuccess(response, "User profile saved successfully");
    });
});

router.post("/personalDetails", (request, response) =>{
    if(!request.body){
        EventHandler.handleError(response, "Incomplete input parameters");
    }
    let params = request.body;
    let updateObj = {"profile.personalDetails": params.personalDetails};
    let query = {_id : params.userId};

    User.update(query, updateObj, (error)=>{
        if(error) EventHandler.handleError(response, error);
        EventHandler.sendSuccess(response, "User details saved successfully");
    });
});

router.post("/skills", (request, response) =>{
    if(!request.body){
        EventHandler.handleError(response, "Incomplete input parameters");
    }
    let params = request.body;
    let updateObj = {"profile.skills": params.skills};
    let query = {_id : params.userId};

    User.update(query, updateObj, (error)=>{
        if(error) EventHandler.handleError(response, error);
        EventHandler.sendSuccess(response, "User skills updated successfully");
    });
});

router.post("/experienceDetails", (request, response) =>{
    if(!request.body){
        EventHandler.handleError(response, "Incomplete input parameters");
    }
    let params = request.body;
    let updateObj = {"profile.experienceDetails": params.experienceDetails};
    let query = {_id : params.userId};

    User.update(query, updateObj, (error)=>{
        if(error) EventHandler.handleError(response, error);
        EventHandler.sendSuccess(response, "User experience  updated successfully");
    });
});

router.post("/educationDetails", (request, response) =>{
    if(!request.body){
        EventHandler.handleError(response, "Incomplete input parameters");
    }
    let params = request.body;
    let updateObj = {"profile.educationDetails": params.educationDetails};
    let query = {_id : params.userId};

    User.update(query, updateObj, (error)=>{
        if(error) EventHandler.handleError(response, error);
        EventHandler.sendSuccess(response, "User education details updated successfully");
    });
});

router.post("/getUsers", (request, response) =>{
    if(!request.body){
        EventHandler.handleError(response, "Incomplete input parameters");
    }
    let params = request.body;
    let query = {role : params.role};

    User.find(query, "_id firstName lastName email", (error, users)=>{
        if(error) EventHandler.handleError(response, error);
        EventHandler.sendSuccessWithData(response, "User details based on role retrieved successfully", users);
    });
});

module.exports = router;