const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require("../middleware/authMiddleware");

// Get all jobs route
router.get('/jobs', jobController.getAllJobs);

// Get job by ID route
router.get('/jobs/:id', jobController.getJobById);

// Create job route
router.get("/createjob", authMiddleware, jobController.showCreateJob)
router.post('/jobs', authMiddleware, jobController.createJob);

// Update job route
router.get("/jobs/:id/edit", authMiddleware, jobController.viewEditForm)
router.post('/jobs/:id', authMiddleware, jobController.updateJob);

// Delete job route
router.delete('/jobs/:id', authMiddleware, jobController.deleteJob);

// Apply to job route
router.get("/apply/:id", jobController.viewApplyForm);
router.post('/apply/:id', jobController.applyToJob);

// Get applicants for job route
router.get('/jobs/:id/applicants', authMiddleware, jobController.getApplicantsForJob);

module.exports = router;
