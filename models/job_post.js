let mongoose = require("mongoose");

let jobPostSchema = new mongoose.Schema({
    jobTitle: String,
    jobCode: String,
    band: String,
    jobDescription: String,
    minSalary: String,
    maxSalary: String,
    experience: String,
    qualification: String,
    skills: [{
        type: String
    }],
    interviewerIds: [
        {
            type : mongoose.Schema.Types.ObjectId, 
            ref:"users"
        }
    ],
    creatorId: {
        type : mongoose.Schema.Types.ObjectId, 
        ref:"users"
    },
    interviewType: String,
    assignedHR: {
        type : mongoose.Schema.Types.ObjectId, 
        ref:"users"
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

let User = mongoose.model("job_posts", jobPostSchema);

module.exports = User;