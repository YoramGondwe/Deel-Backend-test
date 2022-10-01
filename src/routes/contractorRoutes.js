const express = require('express');
const {getProfile} = require('../middleware/getProfile');
const {getContracts, getAllContracts} = require('../controllers/contractor')
const router = express.Router();

router.get('/',getProfile,getAllContracts);
router.get('/:id',getProfile,getContracts);

module.exports = router;