import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    name: String,
    email: String
});

export default mongoose.model('Message', messageSchema);
