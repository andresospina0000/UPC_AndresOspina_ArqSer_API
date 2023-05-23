const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees.controller');
const postsController = require('../controllers/posts.controller');

router.get('/employees', employeesController.list);
router.get('/employees/oldest', employeesController.oldest);
router.get('/employees/:NAME', employeesController.getByName);
router.post('/employees', employeesController.create);

//CRUD posts
router.post('/posts', postsController.create);
router.get('/posts', postsController.findAll);
router.get('/posts/:id', postsController.findOne);
router.patch('/posts/:id', postsController.update);
router.delete('/posts/:id', postsController.delete);


module.exports = router;