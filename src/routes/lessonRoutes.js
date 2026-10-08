const express = require('express');
const controller = require('../controllers/lessonController');
const { validateLesson, validatePatch } = require('../middlewares/validateLesson');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', validateLesson, controller.create);
router.put('/:id', validateLesson, controller.update);
router.patch('/:id', validatePatch, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
