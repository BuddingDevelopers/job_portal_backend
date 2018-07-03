let express = require("express");
let route = express.Router();
let User = require("../models/user");
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
    let condition = {
        email : params.email,
        password: params.password
    };

    User.findOne(condition, (error, user) => {
        if(error) EventHandler.handleError(response, error);

        if(user !== null){
            EventHandler.sendSuccessWithData(response, "Login successful", user);
        } else {
            EventHandler.handleError(response, "Login Failed");
        }
    })

});


module.exports = route;
