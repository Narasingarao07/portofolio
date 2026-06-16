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

const ExperienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    org: { type: String, required: true },
    period: { type: String, required: true },
    location: { type: String, required: true },
    badge: { type: String },
    desc: { type: String, required: true },
    type: { type: String, default: 'exp' },
    icon: { type: String, default: 'briefcase' }
}, schemaOptions);

export const Experience = mongoose.model('Experience', ExperienceSchema);
