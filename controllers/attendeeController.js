const {getAllAttendees} = require('../models/attendeeModel.js')

const _getAllAttendees = async(req, res)=>{
    try {
        const result = await getAllAttendees();
        res.json(result)
        
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'something wrong'}) 
    }
}

module.exports = {_getAllAttendees}