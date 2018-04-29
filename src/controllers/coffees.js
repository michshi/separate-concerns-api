const model = require('../models/coffees')

function getAll (req, res, next) {
  const data = model.getAll()

  res.status(200).json({ data })
}


function find (req, res, next) {
  const result = model.find(req.params.id)

  if(result === undefined) {
    return next({status: 404, message: `Could not find coffee`})
  }

  if(result.errors) {
    return next({status: 400, message: `The ID is required`})
  }

  res.status(200).json({ data: result })
}


function create (req, res, next) {
  const result = model.create(req.body)

  if (result.errors) {
    return next({ status: 400, message: `Could not create new coffee`, errors: result.errors })
  }

  res.status(201).json({ data: result })
}


function update (req, res, next) {
  let result = model.find(req.params.id)

  if (result === undefined) {
    return next({ status: 404, message: `Could not find coffee with id of ${req.params.id}` })
  }

  if (result.errors) {
    return next({ status: 400, message: `The id is required` })
  }

  result = model.update(result, req.body)

  if (result.errors) {
    return next({ status: 400, message: `Fields name and region are required` })
  }

  res.status(200).json({ data: result })
}


function remove (req, res, next) {
  let result = model.find(req.params.id)

  if (result === undefined) {
    return next({ status: 404, message: `Could not find coffee with id of ${req.params.id}` })
  }

  if (result.errors) {
    return next({ status: 400, message: `The id is required` })
  }

  model.remove(result)

  res.status(204).json()
}


module.exports = { getAll, create, find, update, remove }
