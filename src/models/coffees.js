const uuid = require('uuid/v4')
const coffees = []

function getAll () {
  return coffees
}


function find(id) {
  const errors = []
  let response

  if (!id) {
    errors.push('id is required')
    response = { errors }
  } else {
    const coffee = coffees.find(coffee => coffee.id === id)
    response = coffee
  }
  return response
}


function create (body) {
  const errors = []
  const { name, region } = body
  let response

  if (!name) {
    errors.push('name is required')
    response = { errors }
  } else if (!region) {
    errors.push('region is required')
    response = { errors }
  } else {
    const coffee = { id: uuid(), name, region }
    coffees.push(coffee)
    response = coffee
  }

  return response
}


function update(coffee, body) {
  const errors = []
  const { name, region } = body
  let response

  if (!name) {
    errors.push('name is required')
    response = { errors }
  } else if (!region) {
    errors.push('region is required')
    response = { errors }
  } else {
    coffee.name = name
    coffee.region = region
    response = coffee
  }

  return response
}


function remove(coffee) {
  const index = coffees.indexOf(coffee)
  coffees.splice(index, 1)
}

module.exports = { getAll, find, create, update, remove }
