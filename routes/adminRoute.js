const express = require('express')
const {_getFields}=require('../controllers/adminController.js')

const router = express.Router()

//route to get all available fields and chose relevant
router.get('/fields', _getFields)

//route to save selected fields for tag
router.post('/tag/fields')

module.exports = router

