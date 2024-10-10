const {searchAttendee} = require('../models/userModel')

const _searchAttendee = async (req, res) =>{
    const query = req.query.query;
    // console.log(req.query);
    
    try {
        const attendees = await searchAttendee(query);
        res.status(200).json(attendees);
        
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'error finding attendee'})
    }
}

module.exports = {_searchAttendee}