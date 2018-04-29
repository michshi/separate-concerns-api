const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/coffees')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.find)
router.post('/', ctrl.create)
router.put('/:id', ctrl.update)
router.delete('/:id', ctrl.remove)

module.exports = router
