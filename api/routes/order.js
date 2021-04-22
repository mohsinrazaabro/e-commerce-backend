const express = require('express')
const router = express.Router()


const orderController = require('../controllers/orderController')


router.post('/post', orderController.makeOrder)


module.exports = router