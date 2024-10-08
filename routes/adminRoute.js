const express = require('express')
const {_getFields, _saveTagFields, _updateFontType, _updateColorSize}=require('../controllers/adminController.js')

const router = express.Router()

//route to get all available fields and chose relevant
router.get('/fields', _getFields)

//route to save selected fields for tag
router.post('/tag/fields', _saveTagFields)

//route to save font-type of selected fields
router.post('/tag/font', _updateFontType)

//route to save font-color for each field
router.post('/tag/font-color-size', _updateColorSize)

module.exports = router

