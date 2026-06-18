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

// --- CHATBOT ---
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;
        if (!message) {
            return res.status(400).json({ message: 'Message is required.' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ message: 'Gemini API Key is not configured on the server.' });
        }

        // Fetch the latest data from the database
        const [projects, certifications, education, experience] = await Promise.all([
            Project.find(),
            Certification.find(),
            Education.find(),
            Experience.find()
        ]);

        // Format data into context
        const projectsContext = projects.map(p => 
            `- ${p.title}: ${p.desc} (Technologies: ${p.tech.join(', ')}). GitHub: ${p.github}, Live demo: ${p.live || 'N/A'}`
        ).join('\n');

        const educationContext = education.map(e =>
            `- ${e.title} at ${e.org} (${e.period}). Location: ${e.location}. Score/Badge: ${e.badge || 'N/A'}. Details: ${e.desc}`
        ).join('\n');

        const experienceContext = experience.map(x =>
            `- ${x.title} at ${x.org} (${x.period}). Location: ${x.location}. Details: ${x.desc}`
        ).join('\n');

        const certificationsContext = certifications.map(c =>
            `- ${c.title} issued by ${c.issuer} (${c.date}). Skills/Tags: ${c.tags.join(', ')}`
        ).join('\n');

        const systemContext = `You are a professional, friendly, and helpful AI assistant chatbot representing Narasinga Rao Tammineni (often called Narasinga) on his personal portfolio website.

Your task is to answer user queries using his verified portfolio and resume details:

--- PROJECTS ---
${projectsContext}

--- EDUCATION ---
${educationContext}

--- EXPERIENCE ---
${experienceContext}

--- CERTIFICATIONS ---
${certificationsContext}

--- ADDITIONAL INFO ---
Name: Narasinga Rao Tammineni
Role: Full-Stack Developer & CS Student
College: Gayatri Vidya Parishad College of Engineering (GVPCE), current CGPA: 8.2/10
Diploma College: Sai Ganapathi Polytechnic College, Score: 9.4/10
Interests: Web development, open-source, video editing, competitive programming.
Skills: React, Node.js, Express, MongoDB, Python, Django, AWS, Postgres, Firebase, Git, video editing.

Guidelines:
1. Answer queries accurately based on the context above. If something is not mentioned, politely explain you don't have that information. Do not invent details.
2. Keep your answers brief, engaging, and professional.
3. If the user asks something completely unrelated to Narasinga's professional background, skills, or portfolio, politely ask them to focus their questions on Narasinga's profile.
4. Respond using clean markdown formatting (bolding, lists, etc.) when appropriate. Do not use generic greetings in every single message unless it is the first turn.`;

        // Format history and current message for Gemini API
        const contents = [];
        if (history && Array.isArray(history)) {
            history.slice(-10).forEach(item => {
                contents.push({
                    role: item.role === 'user' ? 'user' : 'model',
                    parts: [{ text: item.text }]
                });
            });
        }
        
        contents.push({
            role: 'user',
            parts: [{ text: message }]
        });

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [{ text: systemContext }]
                },
                contents: contents
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error:', errorText);
            return res.status(502).json({ message: 'Error response from Gemini API', error: errorText });
        }

        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
        res.json({ response: responseText });

    } catch (err) {
        console.error('Chat error:', err);
        res.status(500).json({ message: 'Server error during chat processing', error: err.message });
    }
});

// Fallback for non-API client routes (SPA routing)
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;
