import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description?: string;
    completed: boolean;
    taskSectionId: string;
    dueDate?: Date;
    comments: string[];
}

const TaskSchema: Schema = new Schema({
    title: {
        type: String,
        required: 'You must fill in a title',
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    comments: {
        type: [String],
        default: [],
    },
    // TODO
    taskSectionId: {
        type: String,
        required: 'You must add a TaskSectionId',
        default: '0',
    },
});

export default mongoose.model<ITask>('Task', TaskSchema);
