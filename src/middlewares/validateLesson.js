const service = require('../services/lessonService');

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

// возвращает текст ошибки или нул если всё нормально
function check(lesson) {
  if (typeof lesson.title !== 'string' || lesson.title.trim() === '') {
    return 'title обязателен и должен быть строкой';
  }
  if (!service.days.includes(lesson.weekday)) {
    return 'weekday должен быть один из: ' + service.days.join(', ');
  }
  if (!timeRegex.test(lesson.startTime) || !timeRegex.test(lesson.endTime)) {
    return 'startTime и endTime должны быть в формате HH:MM';
  }
  if (lesson.startTime >= lesson.endTime) {
    return 'startTime должно быть раньше endTime';
  }
  return null;
}

function validateLesson(req, res, next) {
  const error = check(req.body || {});
  if (error) {
    return res.status(400).json({ error: error });
  }
  next();
}

// сначала склеиваем старое занятие с новыми полями потом чекаем это
function validatePatch(req, res, next) {
  try {
    const old = service.getById(Number(req.params.id));
    const error = check({ ...old, ...req.body });
    if (error) {
      return res.status(400).json({ error: error });
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { validateLesson, validatePatch };
