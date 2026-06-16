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

const CertificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true },
    icon: { type: String, default: '🏆' },
    tags: [{ type: String }],
    link: { type: String, default: '#' },
    color: { type: String, default: '#5c6bff' },
    attachment: { type: String } // Base64 data URI or file link
}, schemaOptions);

export const Certification = mongoose.model('Certification', CertificationSchema);
