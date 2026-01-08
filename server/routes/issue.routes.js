const { Router } = require("express");
const authenticate = require("../middleware/auth.middlewares");
const { createIssue, getMyIssues } = require("../controllers/issue.controllers");

const issueRoutes = Router();

issueRoutes.post("/create-issue", authenticate, createIssue);
issueRoutes.get("/my-issues", authenticate, getMyIssues);

module.exports = issueRoutes;
