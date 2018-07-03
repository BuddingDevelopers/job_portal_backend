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
    interviewerIds: Array,
    creatorId: String,
    interviewType: String,
    assignedHRId: String,
    isApproved: Boolean,
    createdDate: Date
});

let User = mongoose.model("job_posts", jobPostSchema);

module.exports = User;