let express = require("express");

let EventHandler  = {

    sendSuccess : (response, message) =>{
        response.json({status: "SUCCESS", message: message});
    },

    sendSuccessWithData : (response, message, data) =>{
        response.json({status: "SUCCESS", message: message, data: data});
    },

    handleError : (response, error) =>{
        response.json({status: "FAILURE", message: error});
    }
}

module.exports = EventHandler;