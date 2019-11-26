const express = require('express');
const router = express.Router();
const dealersController = require('../controllers/dealersController');

router.post('/register', dealersController.postRegister);
router.post('/login', dealersController.postLogin);
//router.get('/cashback/:dealerCpf', dealersController.get);

module.exports = router;