const express = require(`express`)

const admin = require(`../Helpers/jwt`)

const { getAll, addOrder, getOrder, updateOrder, deleteOrder, deleteManyOrder, updateManyOrder } = require("../controllers/order_controller")

const orderRoute = express.Router()


orderRoute.get(`/all`, admin, getAll)

orderRoute.post(`/add`, addOrder)

orderRoute.get(`/:id`, admin, getOrder)

orderRoute.put(`/:id`, updateOrder)

orderRoute.delete(`/:id`, deleteOrder)

orderRoute.delete(`/`, deleteManyOrder)

orderRoute.put(`/update/many`, admin, updateManyOrder)

module.exports = orderRoute