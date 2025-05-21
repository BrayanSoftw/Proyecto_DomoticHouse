const express = require('express');
const router = express.Router();
const habitacionController = require('../controllers/habitacionController');

router.get('/', habitacionController.getHabitaciones);
router.post('/', habitacionController.createHabitacion);
router.put('/:id', habitacionController.updateHabitacion);
router.delete('/:id', habitacionController.deleteHabitacion);

module.exports = router;
