const express = require('express');
const {getProfile} = require('../middleware/getProfile');
const { getAllUnpaidJobs, payJobs} = require('../controllers/jobs')

const router = express.Router();

router.get('/unpaid',getProfile,getAllUnpaidJobs);
router.get('/:job_id/pay',getProfile, payJobs);

module.exports = router;