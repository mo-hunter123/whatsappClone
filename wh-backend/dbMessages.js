import mongoose from 'mongoose'
//data schema right here 

const whSchema = mongoose.Schema({
    message: String,
    name: String, 
    timestamp: String, 
    received: Boolean
});

export default mongoose.model('messagecontents', whSchema)
