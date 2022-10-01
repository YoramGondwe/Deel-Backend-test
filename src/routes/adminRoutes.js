const express = require('express');
const {getProfile} = require('../middleware/getProfile');
const {getBestProfessionals,getBestClients} = require('../controllers/admin')

const router = express.Router();

router.get('/best-profession',getProfile,getBestProfessionals);
router.get('/best-client',getProfile,getBestClients);


module.exports = router;