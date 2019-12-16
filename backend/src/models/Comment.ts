import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    createdAt: Date;
    createdBy: string;
    description: string;
    taskId: string;
}

const CommentSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    // TODO
    createdBy: {
        type: String,
        required: 'You must add a userId',
        default: 'Nills',
    },
    // TODO
    description: {
        type: String,
        required: 'You must add a description',
    },
    // TODO
    taskId: {
        type: String,
        required: 'You must add a taskId',
        default: 'taskId',
    },
});

export default mongoose.model<IComment>('Comment', CommentSchema);
