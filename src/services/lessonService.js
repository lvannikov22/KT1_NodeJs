const lessons = require('./store');

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
let nextId = 1;

function makeErr(msg, status) {
  const e = new Error(msg);
  e.status = status;
  return e;
}

// проверка пересечения времени
function checkOverlap(lesson, ignoreId) {
  for (let i = 0; i < lessons.length; i++) {
    const other = lessons[i];
    if (other.id === ignoreId) continue;
    if (other.weekday !== lesson.weekday) continue;
    if (lesson.startTime < other.endTime && lesson.endTime > other.startTime) {
      throw makeErr('Занятие пересекается с "' + other.title + '" (' + other.startTime + '-' + other.endTime + ')', 400);
    }
  }
}

function getAll(weekday) {
  if (weekday) {
    return lessons.filter(l => l.weekday === weekday);
  }
  return lessons;
}

function getById(id) {
  const lesson = lessons.find(l => l.id === id);
  if (!lesson) {
    throw makeErr('Занятие с id ' + id + ' не найдено', 404);
  }
  return lesson;
}

function create(data) {
  const lesson = {
    id: nextId,
    title: data.title,
    weekday: data.weekday,
    startTime: data.startTime,
    endTime: data.endTime
  };
  checkOverlap(lesson, null);
  nextId++;
  lessons.push(lesson);
  return lesson;
}

//то что не прислали остаётся как и было
function update(id, data) {
  const lesson = getById(id);
  const newLesson = {
    id: id,
    title: data.title || lesson.title,
    weekday: data.weekday || lesson.weekday,
    startTime: data.startTime || lesson.startTime,
    endTime: data.endTime || lesson.endTime
  };
  checkOverlap(newLesson, id);
  Object.assign(lesson, newLesson);
  return lesson;
}

function remove(id) {
  const lesson = getById(id);
  lessons.splice(lessons.indexOf(lesson), 1);
}

module.exports = { days, getAll, getById, create, update, remove };
