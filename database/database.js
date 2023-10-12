import mongoose from "mongoose";

export const db = mongoose.connect('mongodb://127.0.0.1:27017', {
    dbName: 'Backend'
}).then(() => {
    console.log('database connected')
}).catch(e => {
    console.log(e)
})


