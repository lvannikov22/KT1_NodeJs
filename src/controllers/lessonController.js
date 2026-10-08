const service = require('../services/lessonService');

function getAll(req, res, next) {
  try {
    res.status(200).json(service.getAll(req.query.weekday));
  } catch (err) {
    next(err);
  }
}

function getOne(req, res, next) {
  try {
    res.status(200).json(service.getById(Number(req.params.id)));
  } catch (err) {
    next(err);
  }
}

function create(req, res, next) {
  try {
    res.status(201).json(service.create(req.body));
  } catch (err) {
    next(err);
  }
}

function update(req, res, next) {
  try {
    res.status(200).json(service.update(Number(req.params.id), req.body));
  } catch (err) {
    next(err);
  }
}

function remove(req, res, next) {
  try {
    service.remove(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getOne, create, update, remove };
