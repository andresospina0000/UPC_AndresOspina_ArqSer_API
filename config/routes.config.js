const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees.controller');

router.get('/employees', employeesController.list);
router.get('/employees/oldest', employeesController.oldest);
router.get('/employees/:NAME', employeesController.getByName);
router.post('/employees', employeesController.create);

module.exports = router;