const service = require('./services/lessonService');

function seed() {
  service.create({ title: 'Футбол', weekday: 'mon', startTime: '10:00', endTime: '11:30' });
  service.create({ title: 'Плавание', weekday: 'mon', startTime: '12:00', endTime: '13:00' });
  service.create({ title: 'Шахматы', weekday: 'tue', startTime: '15:00', endTime: '16:00' });
  service.create({ title: 'Баскетбол', weekday: 'wed', startTime: '17:00', endTime: '18:30' });
  service.create({ title: 'Танцы', weekday: 'thu', startTime: '18:00', endTime: '19:00' });
  service.create({ title: 'Каратэ', weekday: 'fri', startTime: '16:00', endTime: '17:00' });
  service.create({ title: 'Теннис', weekday: 'sat', startTime: '10:00', endTime: '11:00' });
  service.create({ title: 'Йога', weekday: 'sun', startTime: '09:00', endTime: '10:00' });
}

module.exports = seed;
