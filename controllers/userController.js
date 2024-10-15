const {searchAttendee, checkInAttendee} = require('../models/userModel')

const _searchAttendee = async (req, res) =>{
    const query = req.query.query;

    try {
        const attendees = await searchAttendee(query);
        res.status(200).json(attendees);
        
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'error finding attendee'})
    }
}

const _checkInAttendee = async (req, res)=>{
    try{
    const {id} = req.body;
    await checkInAttendee(id);
    res.status(200).json({msg:'attendee checked-in/out successfully'})
} catch (error) {
    console.log(error);
    res.status(404).json({msg:'error toggle check-in'})
}
}



module.exports = {_searchAttendee, _checkInAttendee}