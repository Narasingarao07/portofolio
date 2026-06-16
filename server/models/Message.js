import mongoose from 'mongoose';

const schemaOptions = {
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    toObject: { virtuals: true },
    timestamps: true
};

const MessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    budget: { type: String },
    timeline: { type: String },
    message: { type: String, required: true }
}, schemaOptions);

export const Message = mongoose.model('Message', MessageSchema);
