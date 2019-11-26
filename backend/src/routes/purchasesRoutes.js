const express = require('express');
const router = express.Router();
const purchasesController = require('../controllers/purchasesController');

router.post('/', purchasesController.post);
router.get('/:purchaseCode', purchasesController.get)
router.delete('/:purchaseCode', purchasesController.delete);
router.put('/:purchaseCode', purchasesController.put);

module.exports = router;