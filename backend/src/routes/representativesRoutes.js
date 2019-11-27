const express = require('express');
const router = express.Router();
const representativesController = require('../controllers/representativesController');

router.post('/register', representativesController.postRegister);
router.post('/login', representativesController.postLogin);
router.get('/cashback/:representativeCpf', representativesController.get);

module.exports = router;