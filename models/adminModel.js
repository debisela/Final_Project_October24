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
                table.string('font_type');
                table.string('font_color');
                table.string('font_size');
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

//update tag_settings table, set to true shown_column for all fields selected
const saveTagFields = async(selectedFields)=>{
for (const item of selectedFields){
    await db('tag_settings')
    .update({show_column:true})
    .where('column_name',item.column_name)
}
}

//update tag_settings table with chosen font
const updateFontType = async(fontType)=>{
    await db('tag_settings')
    .update({font_type:fontType})
    .where('show_column',true)
}

//update font-color for specific selected fields
const updateColorSize = async(updateFields)=>{
    for (const item of updateFields){
        await db('tag_settings')
        .update({
        font_color:item.font_color,
        font_size:item.font_size
    })
        .where('column_name',item.column_name)
        .andWhere('show_column',true)
    }
    }

module.exports = {getFields, saveTagFields, updateFontType, updateColorSize}


