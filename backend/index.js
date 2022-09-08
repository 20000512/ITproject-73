// MERN = Mongo + Express + React + Node

// Development = Node.js server + React server

// MEN

// E - Express

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://wilkin:tryone@cluster0.0q0ztzg.mongodb.net/test?retryWrites=true&w=majority')
app.get('/', async (req, res) => {
	res.send("First page use /api/register to add new user use /api/login for login")

})
app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		})
		res.json({ status: 'ok' })
	} catch (err) {
        console.log(err)
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
		password: req.body.password,
	})
	if (user) {
		return res.json({ status: 'ok', user: 'true' })
	}else {
		return res.json ({ status: 'error', user: 'false' })
	}
})
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))
app.listen(1337, () => {
	console.log('Server started on 1337')
})