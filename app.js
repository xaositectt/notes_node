const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const hbs = require('hbs')

const index = require('./routes/index')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, 'views/partials'))


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)

app.use(function(req, res, next) {
  next(createError(404))
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app