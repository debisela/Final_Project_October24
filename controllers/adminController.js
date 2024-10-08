const {getFields, saveTagFields, updateFontType, updateColorSize} = require('../models/adminModel')

const _getFields = async(req, res)=>{
    try {
        const fields = await getFields();
        res.status(200).json(fields);
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'error fetching fields'})
    }
}

const _saveTagFields = async(req, res)=>{

try {
    const {selectedFields} = req.body;
    // console.log(req.body);
    
    await saveTagFields(selectedFields);
    res.status(200).json({msg:'tag fields updated successfully'})
    
    
} catch (error) {
    console.log(error);
    res.status(404).json({msg:'error updating tag fields'})
}
}

const _updateFontType = async(req, res)=>{

    try {
        const {fontType} = req.body;
        console.log(req.body);
        
        await updateFontType(fontType);
        res.status(200).json({msg:'font-type updated successfully'})
        
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'error updating font-type'})
    }
    }


const _updateColorSize = async(req, res)=>{

        try {
            const {updateFields} = req.body;
            console.log(req.body);
            
            await updateColorSize(updateFields);
            res.status(200).json({msg:'font-color and size updated successfully'})
            
        } catch (error) {
            console.log(error);
            res.status(404).json({msg:'error updating font-color and size'})
        }
        }

module.exports={_getFields, _saveTagFields, _updateFontType,_updateColorSize}