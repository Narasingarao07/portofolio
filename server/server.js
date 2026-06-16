import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'node:dns';

// Load models
import { Project } from './models/Project.js';
import { Certification } from './models/Certification.js';
import { Education } from './models/Education.js';
import { Experience } from './models/Experience.js';
import { Message } from './models/Message.js';

// Load seed data
import {
    DEFAULT_PROJECTS,
    DEFAULT_EDUCATION,
    DEFAULT_EXPERIENCE,
    DEFAULT_CERTS
} from './seedData.js';

dotenv.config();

// Override default DNS servers to prevent Windows querySrv resolution failures with Atlas
dns.promises.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and body parsing with high limit for Base64 attachments
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static assets from built frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB.');
        seedDatabaseIfNeeded();
    })
    .catch((err) => {
        console.error('CRITICAL: MongoDB connection error. Please verify your connection string in the .env file.');
        console.error(err);
    });

// Seeding function
async function seedDatabaseIfNeeded() {
    try {
        const projectCount = await Project.countDocuments();
        if (projectCount === 0) {
            console.log('Seeding default projects...');
            await Project.insertMany(DEFAULT_PROJECTS);
        }

        const certCount = await Certification.countDocuments();
        if (certCount === 0) {
            console.log('Seeding default certifications...');
            await Certification.insertMany(DEFAULT_CERTS);
        }

        const eduCount = await Education.countDocuments();
        if (eduCount === 0) {
            console.log('Seeding default education...');
            await Education.insertMany(DEFAULT_EDUCATION);
        }

        const expCount = await Experience.countDocuments();
        if (expCount === 0) {
            console.log('Seeding default experience...');
            await Experience.insertMany(DEFAULT_EXPERIENCE);
        }
        console.log('Database seeding checks completed.');
    } catch (err) {
        console.error('Error seeding database:', err);
    }
}

/* ==========================================================================
   API ROUTES
   ========================================================================== */

// --- PROJECTS ---
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving projects', error: err.message });
    }
});

app.post('/api/projects', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const saved = await newProject.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: 'Error creating project', error: err.message });
    }
});

app.put('/api/projects/:id', async (req, res) => {
    try {
        const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Project not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Error updating project', error: err.message });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        const deleted = await Project.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting project', error: err.message });
    }
});


// --- CERTIFICATIONS ---
app.get('/api/certifications', async (req, res) => {
    try {
        const certs = await Certification.find().sort({ createdAt: -1 });
        res.json(certs);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving certifications', error: err.message });
    }
});

app.post('/api/certifications', async (req, res) => {
    try {
        const newCert = new Certification(req.body);
        const saved = await newCert.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: 'Error creating certification', error: err.message });
    }
});

app.put('/api/certifications/:id', async (req, res) => {
    try {
        const updated = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Certification not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Error updating certification', error: err.message });
    }
});

app.delete('/api/certifications/:id', async (req, res) => {
    try {
        const deleted = await Certification.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Certification not found' });
        res.json({ message: 'Certification deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting certification', error: err.message });
    }
});


// --- EDUCATION ---
app.get('/api/education', async (req, res) => {
    try {
        const edu = await Education.find().sort({ createdAt: -1 });
        res.json(edu);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving education', error: err.message });
    }
});

app.post('/api/education', async (req, res) => {
    try {
        const newEdu = new Education(req.body);
        const saved = await newEdu.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: 'Error creating education entry', error: err.message });
    }
});

app.put('/api/education/:id', async (req, res) => {
    try {
        const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Education entry not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Error updating education entry', error: err.message });
    }
});

app.delete('/api/education/:id', async (req, res) => {
    try {
        const deleted = await Education.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Education entry not found' });
        res.json({ message: 'Education entry deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting education entry', error: err.message });
    }
});


// --- EXPERIENCE ---
app.get('/api/experience', async (req, res) => {
    try {
        const exp = await Experience.find().sort({ createdAt: -1 });
        res.json(exp);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving experience', error: err.message });
    }
});

app.post('/api/experience', async (req, res) => {
    try {
        const newExp = new Experience(req.body);
        const saved = await newExp.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: 'Error creating experience entry', error: err.message });
    }
});

app.put('/api/experience/:id', async (req, res) => {
    try {
        const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Experience entry not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Error updating experience entry', error: err.message });
    }
});

app.delete('/api/experience/:id', async (req, res) => {
    try {
        const deleted = await Experience.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Experience entry not found' });
        res.json({ message: 'Experience entry deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting experience entry', error: err.message });
    }
});


// --- MESSAGES ---
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving messages', error: err.message });
    }
});

app.post('/api/messages', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        const saved = await newMessage.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: 'Error saving message', error: err.message });
    }
});

app.delete('/api/messages/:id', async (req, res) => {
    try {
        const deleted = await Message.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Message not found' });
        res.json({ message: 'Message deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting message', error: err.message });
    }
});


// --- RESET TO DEFAULTS ---
app.post('/api/reset', async (req, res) => {
    try {
        await Project.deleteMany({});
        await Certification.deleteMany({});
        await Education.deleteMany({});
        await Experience.deleteMany({});
        await Message.deleteMany({});

        await Project.insertMany(DEFAULT_PROJECTS);
        await Certification.insertMany(DEFAULT_CERTS);
        await Education.insertMany(DEFAULT_EDUCATION);
        await Experience.insertMany(DEFAULT_EXPERIENCE);

        res.json({ message: 'Successfully reset database to defaults' });
    } catch (err) {
        res.status(500).json({ message: 'Error resetting database', error: err.message });
    }
});


// --- IMPORT / EXPORT CONFIG ---
app.post('/api/import', async (req, res) => {
    try {
        const { projects, education, experience, certifications, messages } = req.body;

        if (projects && Array.isArray(projects)) {
            await Project.deleteMany({});
            await Project.insertMany(projects);
        }
        if (education && Array.isArray(education)) {
            await Education.deleteMany({});
            await Education.insertMany(education);
        }
        if (experience && Array.isArray(experience)) {
            await Experience.deleteMany({});
            await Experience.insertMany(experience);
        }
        if (certifications && Array.isArray(certifications)) {
            await Certification.deleteMany({});
            await Certification.insertMany(certifications);
        }
        if (messages && Array.isArray(messages)) {
            await Message.deleteMany({});
            await Message.insertMany(messages);
        }

        res.json({ message: 'Successfully imported database configuration' });
    } catch (err) {
        res.status(500).json({ message: 'Error importing database config', error: err.message });
    }
});

// Fallback for non-API client routes (SPA routing)
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
