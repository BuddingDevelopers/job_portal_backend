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
    insertUserData();
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
