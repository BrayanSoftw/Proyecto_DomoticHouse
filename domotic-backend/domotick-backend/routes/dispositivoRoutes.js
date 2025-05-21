const express = require('express');
const router = express.Router();
const dispositivoController = require('../controllers/dispositivoController');

router.get('/', dispositivoController.getDispositivos);
router.post('/', dispositivoController.createDispositivo);
router.put('/:id', dispositivoController.updateDispositivo);
router.delete('/:id', dispositivoController.deleteDispositivo);

module.exports = router;
