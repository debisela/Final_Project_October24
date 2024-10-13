const {db} = require('../config/db.js')

//search attendee by name and get selected fields for attendee
const searchAttendee = async(query)=>{
//get only selected fields
    const selectedFields = await db('tag_settings')
    .select('column_name')
    .where('show_column',true);

//create array of selected fields column_names
const columnNamesSelected = selectedFields.map(item => item.column_name);

//return attendee
const attendees = await db('attendees')
    .select(columnNamesSelected)
    .where('last_name', 'ilike', `${query}%`)

return attendees
}

module.exports={searchAttendee}