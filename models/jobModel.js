// Mock database for jobs
const jobs = [];

const jobModel = {
    // Get all jobs
    getAllJobs: () => {
        return jobs;
    },

    // Get a job by ID
    getJobById: (id) => {
        const job = jobs.find(job => job.id === id);
        return job;
    },

    // Add a new job
    addJob: (job) => {
        jobs.push({...job, id: crypto.randomUUID(), applicants: []});
    },

    // Update a job by ID
    updateJobById: (id, updatedJob) => {
        const index = jobs.findIndex(job => job.id === id);
        if (index !== -1) {
            jobs[index] = { ...jobs[index], ...updatedJob };
        }
    },

    // Delete a job by ID
    deleteJobById: (id) => {
        const index = jobs.findIndex(job => job.id === id);
        if (index !== -1) {
            jobs.splice(index, 1);
        }
    },

    // Add applicant to a job
    addApplicant: (jobId, applicant) => {
        const job = jobs.find(job => job.id === jobId);
        if (job) {
            job.applicants.push(applicant);
        } else {
            throw new Error('Job not found');
        }
    },

    // Get applicants for a job by ID
    getApplicantsForJob: (id) => {
        const job = jobs.find(job => job.id === id);
        if (job) {
            return job.applicants;
        } else {
            throw new Error('Job not found');
        }
    }
};

// Populate jobs array with dummy data
jobModel.addJob({
    id: "1",
    category: "Engineering",
    title: 'Software Engineer',
    company: 'Block',
    location: 'Bhopal',
    package: '12-18 LPA',
    creationDate: "14/02/2024",
    applyBy: "14/02/2024",
    openings: 2,
    skillsRequired: "NextJS",
    applicants: []
});

jobModel.addJob({
    id: "2",
    category: "Designing",
    title: 'UI/UX',
    company: 'UI WAALE',
    location: 'Bhopal',
    package: '2-5 LPA',
    creationDate: "14/02/2024",
    applyBy: "14/02/2024",
    openings: 9,
    skillsRequired: "Figma, AdobeXD",
    applicants: []
});

module.exports = jobModel;
