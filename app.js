const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const uuid = require('uuid/v4')

app.disable('x-powered-by')
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())


const coffeesRoutes = require('./src/routes/coffees')
app.use('/coffees', coffeesRoutes)

app.get('/coffees', (req, res, next) => {
  res.json({ data: coffees })
})

app.get('/coffees/:id', (req, res, next) => {
  const id = req.params.id
  const coffee = coffees.find(coffee => coffee.id === id)
  if (!coffee) return next({ status: 404, message: `Could not find coffee with id of ${id}` })

  res.json({ data: coffee })
})

app.post('/coffees', (req, res, next) => {
  const { name, region } = req.body
  if (!name || !region) return next({ status: 400, message: `Fields name and region are required` })

  const coffee = { id: uuid(), name, region }
  coffees.push(coffee)
  res.status(201).json({ data: coffee })
})

app.put('/coffees/:id', (req, res, next) => {
  const id = req.params.id
  const coffee = coffees.find(coffee => coffee.id === id)
  if (!coffee) return next({ status: 404, message: `Could not find coffee with id of ${id}` })

  const { name, region } = req.body
  if (!name || !region) return next({ status: 400, message: `Fields name and region are required` })

  coffee.name = name
  coffee.region = region
  res.status(200).json({ data: coffee })
})

app.delete('/coffees/:id', (req, res, next) => {
  const id = req.params.id
  const coffee = coffees.find(coffee => coffee.id === id)
  if (!coffee) return next({ status: 404, message: `Could not find coffee with id of ${id}` })

  const index = coffees.indexOf(coffee)
  coffees.splice(index, 1)
  res.status(204).json()
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err })
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }})
})

const listener = () => `Listening on port ${port}!`
app.listen(port, listener)

module.exports = app
