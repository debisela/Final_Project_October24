const {db} = require('../config/db.js')

//create tag settings table
const createTagSettingsTable = async() =>{
    try {
        //check if table already exists
        const tableExist = await db.schema.hasTable('tag_settings');

        if (!tableExist) {
            await db.schema.createTable('tag_settings', (table)=>{
                table.increments('id').primary();
                table.string('column_name').notNullable();
                table.boolean('show_column').defaultTo(false);
                table.string('font_color');
                table.string('background_color');
                table.string('criteria');
            });
            console.log('tag_settings table created'); 
        }
        else{
            console.log('tag_settings table already exists')
        }

        //add column names from attendee table to tag_settings table
        const attendeeColumns = await db.raw(`
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = 'attendees'
            `);

            for (const column of attendeeColumns.rows){
                const existing = await db('tag_settings').where({column_name:column.column_name}).first();
                if(!existing){
                    await db('tag_settings').insert({column_name:column.column_name})
                }
            }
            console.log('tag_settings table initialized with attendee columns');
            
    } catch (error) {
        console.log('error initializing tag_settings:', error);
        
    }
}

createTagSettingsTable()

//fetch all column names from attendee table
const getFields = async()=>{
    return await db('tag_settings')
    .select('column_name')
}

// const saveTagFields = async(selectedFields)=>{
//     await db('tag_settings').update
// }




module.exports = {getFields}