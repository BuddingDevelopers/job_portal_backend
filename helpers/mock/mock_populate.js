let fs = require('fs');
let mockData = require('./mock.json');
let User = require("../../models/user");
let JobPost = require("../../models/job_post");
let mongoose = require("mongoose");

connectDB().on('error', ()=>console.log)
.on('disconnect', connectDB)
.once('open', insertMocks);

/**
 * Method to connect to the DB and return the database connection
 */
function connectDB(){
    mongoose.connect('mongodb://admin:admin123@localhost/job_portal?authSource=admin');
    return mongoose.connection;
}

function insertMocks(){
    //insertUserData();
    insertJobPosts();
}

function insertJobPosts(){
    let userIds = {
        "manager" : "5b3ca057e553200dc885f36c",
        "interviewer" : "5b3ca057e553200dc885f36e",
        "hr": "5b3ca057e553200dc885f36d"
    }
    mockData.jobpost.map((post, idx) => {
        post.creatorId = userIds.manager;
        post.interviewerIds = [userIds.interviewer];
        post.assignedHRId = userIds.hr;
        let jobPost = new JobPost(post);
        jobPost.save((err, jobMod) => {
            if(err) console.log("error while inserting ", post.jobCode);
            console.log("inserted ", post.jobCode);
        });
    });
}

function insertUserData(){
    let userKeys = {
        manager : [],
        candidate: [],
        hr: [],
        interviewer: []
    };
    mockData.users.map((usr, idx) => {
        let user = new User(usr);
        user.save((err, usrMod)=>{
            if(err) console.log("error while inserting ", usr.email);
            console.log("inserted ", usr.email);
        })
    });
}
