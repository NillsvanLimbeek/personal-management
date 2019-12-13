import mongoose, { Schema } from 'mongoose';

const TaskSectionSchema = new Schema({
    title: {
        type: String,
        required: 'Please add a title',
        trim: true
    },
    
});

export default mongoose.model('TaskSection', TaskSectionSchema)