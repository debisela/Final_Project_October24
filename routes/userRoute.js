const express = require('express')
const { _searchAttendee } = require('../controllers/userController.js')


const router = express.Router()

//search for attendees
// router.get('/search/:query')
router.get('/attendees', _searchAttendee)



module.exports = router