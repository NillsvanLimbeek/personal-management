import mongoose, { Schema, Document } from 'mongoose';

interface ITaskSection extends Document {
    title: string;
    taskIds: string[];
    isOpen: boolean;
    sort: 'up' | 'down';
}

const TaskSectionSchema = new Schema({
    title: {
        type: String,
        required: 'Please add a title',
        trim: true,
    },
    taskIds: [String],
    isOpen: {
        type: Boolean,
        default: false,
    },
    sort: {
        type: String,
    },
});

export default mongoose.model<ITaskSection>('TaskSection', TaskSectionSchema);
