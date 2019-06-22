const express = require('express')
const router = express.Router()
const notes = require('../models/repository')

router.get('/', async function(req, res, next) {
  let keylist = await notes.keys()
  let notePromises = keylist.map(key => {
    return notes.get(key)
  })

  let noteList = await Promise.all(notePromises)
  res.render('index', {
    title: 'Notes',
    noteList
  })
})

module.exports = router
