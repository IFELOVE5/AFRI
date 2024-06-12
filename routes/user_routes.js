const express = require(`express`)
const checkAuth = require(`../Helpers/jwt`)

const { signUp, getUsers, getUser, updateUser, deleteUser, userLogin } = require("../controllers/user_controller")

const userRoute = express.Router()

userRoute.post(`/add`, signUp)

userRoute.get(`/all`, checkAuth, getUsers)

userRoute.get(`/:id`, checkAuth, getUser)

userRoute.put(`/:id`, updateUser)

userRoute.delete(`/:id`, checkAuth, deleteUser)

userRoute.post(`/login`, userLogin)

module.exports = userRoute