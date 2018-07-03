const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require("./routes/user_route");
const authRoute = require("./routes/auth_route");
const jobPostRoute = require("./routes/job_post_route");

const app = express();
const PORT = 3000;

connectDB().on('error', ()=>console.log)
.on('disconnect', connectDB)
.once('open', startServer);

/**
 * Method to connect to the DB and return the database connection
 */
function connectDB(){
    mongoose.connect('mongodb://admin:admin123@localhost/job_portal?authSource=admin');
    return mongoose.connection;
}

/**
 * Method to start the server once the db is connected
 */
function startServer(){

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended : true}));

    app.use("/users", userRoute);

    app.use("/auth", authRoute);

    app.use("/jobPost", jobPostRoute);

    app.listen(PORT, function(){
        console.log("Server running on port "+ PORT);
    });
}