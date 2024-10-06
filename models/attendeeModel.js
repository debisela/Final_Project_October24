const {db} = require('../config/db.js')

const getAllAttendees = () =>{
        return db('attendees')
        .select('id', 'first_name', 'last_name', 'title', 'company', 'badge_type')
    }

module.exports={getAllAttendees}
