const {getFields, saveTagFields} = require('../models/adminModel')

const _getFields = async(req, res)=>{
    try {
        const fields = await getFields();
        res.status(200).json(fields);
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'something wrong'})
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
    res.status(404).json({msg:'cant find tagfields'})
}
}

module.exports={_getFields, _saveTagFields}