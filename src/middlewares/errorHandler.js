function errorHandler(err, req, res, next) {
  // кривой json
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Некорректный JSON' });
  }
  const status = err.status || 500;
  if (status === 500) {
    console.log(err);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
  res.status(status).json({ error: err.message });
}

module.exports = errorHandler;
