const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees.controller');
const postsController = require('../controllers/posts.controller');
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/employees', employeesController.list);
router.get('/employees/oldest', employeesController.oldest);
router.get('/employees/:NAME', employeesController.getByName);
router.post('/employees', employeesController.create);

//CRUD posts
router.post('/posts', authMiddleware.isAuthenticated, postsController.create);
router.get('/posts', authMiddleware.isAuthenticated, postsController.findAll);
router.get('/posts/:id', authMiddleware.isAuthenticated, postsController.findOne);
router.patch('/posts/:id', authMiddleware.isAuthenticated, postsController.update);
router.delete('/posts/:id', authMiddleware.isAuthenticated, postsController.delete);

// CRUD users
router.post('/users', usersController.create);
router.post('/login', authMiddleware.isActive, usersController.login);
router.get('/users/:id/validate', usersController.validate);


module.exports = router;