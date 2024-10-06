const express = require('express')
const {_getAllAttendees}=require('../controllers/attendeeController.js')

const router = express.Router()

router.get('/attendees', _getAllAttendees)

module.exports = router