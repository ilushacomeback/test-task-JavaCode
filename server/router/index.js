const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const todosController = require('../controllers/todos-controller')
const router = new Router();
const { body } = require('express-validator');

router.post(
  '/register',
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 32 }),
  userController.register
);

router.post('/login', userController.login);
router.post('/todos', todosController.addTask)
router.post('/refresh', userController.refresh)
router.patch('/todos/:id', todosController.editTask)
router.delete('/todos/:id', todosController.removeTask)
router.get('/todos/:userId', todosController.getTasks)


module.exports = router;
