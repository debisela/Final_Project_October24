const express = require('express')
const { _searchAttendee, _checkInAttendee } = require('../controllers/userController.js')


const router = express.Router()

//search for attendees
// router.get('/search/:query')
router.get('/attendees', _searchAttendee)

//update checkin status
router.post('/attendees/checkin', _checkInAttendee)


module.exports = router