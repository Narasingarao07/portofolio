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

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    tech: [{ type: String }],
    github: { type: String, required: true },
    live: { type: String },
    gradient: { type: String },
    letter: { type: String },
    featured: { type: Boolean, default: false }
}, schemaOptions);

export const Project = mongoose.model('Project', ProjectSchema);
