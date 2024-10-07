const {getFields} = require('../models/adminModel')

const _getFields = async(req, res)=>{
    try {
        const fields = await getFields();
        res.status(200).json(fields);
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'something wrong'})
        
    }
}


module.exports={_getFields}