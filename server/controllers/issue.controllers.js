const expressAsyncHandler = require("express-async-handler");
const issueCollection = require("../models/issue.models");
const userCollection = require("../models/user.models");
const ApiResponse = require("../utils/ApiResponse.utils");
const ErrorHandler = require("../utils/ErrorHandler");

const createIssue = expressAsyncHandler(async (req, res) => {
  const { title, description, priority, assignedToEmail } = req.body;

  if (!title || !description) {
    throw new ErrorHandler("Title and description are required", 400);
  }

  let assignedUser = null;

  if (assignedToEmail) {
    assignedUser = await userCollection.findOne({
      email: assignedToEmail,
    });

    if (!assignedUser) {
      throw new ErrorHandler("Assigned user not found", 404);
    }
  }

  const issue = await issueCollection.create({
    title,
    description,
    priority,
    createdBy: req.user._id,
    assigned: assignedUser?._id || null,
  });

  new ApiResponse(201, issue, "Issue created successfully").send(res);
});

const getMyIssues = expressAsyncHandler(async (req, res) => {
  const issues = await issueCollection
    .find({ createdBy: req.user._id })
    .populate("assigned", "userName email"); 

  new ApiResponse(200, issues, "My issues fetched successfully").send(res);
});

module.exports = { createIssue, getMyIssues };
