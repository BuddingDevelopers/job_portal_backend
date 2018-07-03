let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    altPhone: String,
    password: String,
    role: String,
    isVerified: Boolean,
    isActive: Boolean,
    profile : {
        personalDetails: {
            address: String,
            city: String,
            state: String,
            country: String,
            pincode: String
        },
        skills: Array,
        experienceDetails : String,
        educationDetails: String
    }
});

let User = mongoose.model("users", userSchema);

module.exports = User;