const express = require('express');
const {getProfile} = require('../middleware/getProfile');
const { deposit} = require('../controllers/accounting')

const router = express.Router();

router.post('/deposit/:user_id',getProfile,deposit);

module.exports = router;