let express = require("express");
let route = express.Router();
let JobPost = require("../models/job_post");
let EventHandler = require("../helpers/EventHandler");

route.use((request, response, next) =>{
    console.log(request);
    next();
});

route.post("/", (request, response) => {
    if(!request.body){
        EventHandler.handleError(response, "Incomplete input parameters");
    }

    let params = request.body;
    let query = {
        jobCode : params.jobCode
    };

    JobPost.findOne(query, (error, post) => {
        if(error) EventHandler.handleError(response, error);

        if(post !== null){
            EventHandler.handleError(response, "Job code already exists");
            return;
        } 

        let jobPost = new JobPost({
            jobTitle: params.jobPost,
            jobCode: params.jobCode,
            band: params.band,
            jobDescription: params.jobDescription,
            minSalary: params.minSalary,
            maxSalary: params.maxSalary,
            experience: params.experience,
            qualification: params.qualification,
            interviewerIds: params.interviewerIds,
            creatorId: params.creatorId,
            interviewType: params.interviewType,
            assignedHR: params.assignedHRId,
            isApproved: false
        });

        jobPost.save((error) => {
            if(error) EventHandler.handleError(response, error);
            EventHandler.sendSuccess(response, "Job post created successfully");
        });
    });

});

route.post("/publishJob", (request, response) => {
    if(!request.body){
        EventHandler.handleError(response, "Incomplete input parameters");
    }

    let params = request.body;

    JobPost.updateOne({_id: params.jobId}, {isApproved : true, updatedDate: Date.now()}, (error)=>{
        if(error) EventHandler.handleError(response, error);
        EventHandler.sendSuccess(response, "Job published successfully");
    });
});

route.get("/getRecentPosts", (request, response) => {
    if(!request.body){
        EventHandler.handleError(response, "Incomplete input parameters");
    }

    let params = request.body;
    let query = {};
    let role = params.role.toLowerCase();
    if(role === "hr"){
        query = {assignedHRId : params.userId};
    } else if(role === "manager"){
        query = {creatorId : params.userId};
    } else if(role === "interviewer"){
        query = {interviewerIds : params.userId};
    }else {
        query = {isApproved : true};
    }

    JobPost.find(query, null, {sort : {updatedDate: -1}, limit: 5}, (error, jobPosts) => {
        if(error) EventHandler.handleError(response, error);
        EventHandler.sendSuccessWithData(response, "Recent Jobs retrieved successfully", jobPosts);
    });
});

route.post("/search", (request, response) => {
    if(!request.body){
        EventHandler.handleError(response, "Incomplete input parameters");
    }

    JobPost.find({$text: {$search: request.body.searchTerm}}, null, {sort : {updatedDate: -1}}, (error, jobPosts) => {
        if(error) EventHandler.handleError(response, error);
        EventHandler.sendSuccessWithData(response, "Job search retrieved successfully", jobPosts);
    });
});

route.post("/getJobPosts", (request, response) => {
    if(!request.body){
        EventHandler.handleError(response, "Incomplete input parameters");
    }

    let params = request.body;
    let query = {};
    let role = params.role.toLowerCase();
    if(role === "hr"){
        query = {assignedHRId : params.userId};
    } else if(role === "manager"){
        query = {creatorId : params.userId};
    } else if(role === "interviewer"){
        query = {interviewerIds : params.userId};
    }else {
        query = {isApproved : true};
    }

    JobPost.find(query, null, {sort: {updatedDate: -1}}, (error, jobPosts) => {
        if(error) EventHandler.handleError(response, error);
        EventHandler.sendSuccessWithData(response, "Job post retrieved successfully", jobPosts);
    });

});




module.exports = route;