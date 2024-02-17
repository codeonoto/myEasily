const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/files/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Rename files with timestamp to avoid filename conflicts
    }
});

// Multer file filter configuration (accept only .pdf files)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Only PDF files are allowed'), false); // Reject file
    }
};

// Multer upload configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const jobModel = require('../models/jobModel');

const jobController = {
    getAllJobs: (req, res) => {
        const jobs = jobModel.getAllJobs();
        res.render("jobListings", {jobs, userEmail: req.session.userEmail});
    },

    getJobById: (req, res) => {
        const jobId = req.params.id;
        const job = jobModel.getJobById(jobId);
        res.render("jobDetails", {job, userEmail: req.session.userEmail});
    },

    showCreateJob: (req, res) => {
        res.render("createJob", {userEmail: req.session.userEmail});
    },

    createJob: (req, res) => {
        const newJob = req.body;
        jobModel.addJob(newJob);
        res.redirect("/jobs");
    },

    viewEditForm: (req, res) => {
        const jobId = req.params.id;
        const job = jobModel.getJobById(jobId);
        res.render("editJob", {job, userEmail: req.session.userEmail});
    },

    updateJob: (req, res) => {
        const jobId = req.params.id;
        const updatedJob = req.body;
        jobModel.updateJobById(jobId, updatedJob);
        res.redirect(`/jobs/${jobId}`);
    },

    deleteJob: (req, res) => {
        const jobId = req.params.id;
        jobModel.deleteJobById(jobId);
        res.json({ message: 'Job deleted successfully', jobId });
    },

    viewApplyForm: (req, res) => {
        const jobId = req.params.id;
        res.render("applyJob", {jobId, userEmail: req.session.userEmail});
    },

    applyToJob: (req, res) => {
        const jobId = req.params.id;
        upload.single('resume')(req, res, function(err) {
            if (err) {
                // Handle Multer errors
                return res.status(400).json({ message: 'File upload error', error: err });
            }
            
            // File upload successful, proceed with applicant creation
            const applicant = req.body;
            const resumePath = req.file ? req.file.path.substring("public".length) : null;
            
            if (!resumePath) {
                // Handle missing file error
                return res.status(400).json({ message: 'Resume file is required' });
            }
    
            applicant.resume = resumePath;
            jobModel.addApplicant(jobId, applicant);
            res.redirect(`/jobs/${jobId}`);
        });
    },

    getApplicantsForJob: (req, res) => {
        const jobId = req.params.id;
        const applicants = jobModel.getApplicantsForJob(jobId);
        res.render("applicants", {applicants, userEmail: req.session.userEmail });
    }
};

module.exports = jobController;
