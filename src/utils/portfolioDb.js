// Database Helper for dynamic portfolio management using Express & MongoDB Atlas

export const portfolioDb = {
    // PROJECTS
    getProjects: async () => {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
    },
    addProject: async (proj) => {
        const res = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proj)
        });
        if (!res.ok) throw new Error('Failed to add project');
        return res.json();
    },
    updateProject: async (id, updatedProj) => {
        const res = await fetch(`/api/projects/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProj)
        });
        if (!res.ok) throw new Error('Failed to update project');
        return res.json();
    },
    deleteProject: async (id) => {
        const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete project');
        return res.json();
    },

    // EDUCATION
    getEducation: async () => {
        const res = await fetch('/api/education');
        if (!res.ok) throw new Error('Failed to fetch education');
        return res.json();
    },
    addEducation: async (edu) => {
        const res = await fetch('/api/education', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...edu, type: 'edu', icon: 'book' })
        });
        if (!res.ok) throw new Error('Failed to add education');
        return res.json();
    },
    updateEducation: async (id, updatedEdu) => {
        const res = await fetch(`/api/education/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEdu)
        });
        if (!res.ok) throw new Error('Failed to update education');
        return res.json();
    },
    deleteEducation: async (id) => {
        const res = await fetch(`/api/education/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete education');
        return res.json();
    },

    // EXPERIENCE
    getExperience: async () => {
        const res = await fetch('/api/experience');
        if (!res.ok) throw new Error('Failed to fetch experience');
        return res.json();
    },
    addExperience: async (exp) => {
        const res = await fetch('/api/experience', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...exp, type: 'exp', icon: 'briefcase' })
        });
        if (!res.ok) throw new Error('Failed to add experience');
        return res.json();
    },
    updateExperience: async (id, updatedExp) => {
        const res = await fetch(`/api/experience/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedExp)
        });
        if (!res.ok) throw new Error('Failed to update experience');
        return res.json();
    },
    deleteExperience: async (id) => {
        const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete experience');
        return res.json();
    },

    // CERTIFICATIONS
    getCertifications: async () => {
        const res = await fetch('/api/certifications');
        if (!res.ok) throw new Error('Failed to fetch certifications');
        return res.json();
    },
    addCertification: async (cert) => {
        const res = await fetch('/api/certifications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cert)
        });
        if (!res.ok) throw new Error('Failed to add certification');
        return res.json();
    },
    updateCertification: async (id, updatedCert) => {
        const res = await fetch(`/api/certifications/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCert)
        });
        if (!res.ok) throw new Error('Failed to update certification');
        return res.json();
    },
    deleteCertification: async (id) => {
        const res = await fetch(`/api/certifications/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete certification');
        return res.json();
    },

    // MESSAGES
    getMessages: async () => {
        const res = await fetch('/api/messages');
        if (!res.ok) throw new Error('Failed to fetch messages');
        return res.json();
    },
    addMessage: async (msg) => {
        const res = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(msg)
        });
        if (!res.ok) throw new Error('Failed to send message');
        return res.json();
    },
    deleteMessage: async (id) => {
        const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete message');
        return res.json();
    },

    // RESET TO DEFAULTS
    resetToDefaults: async () => {
        const res = await fetch('/api/reset', { method: 'POST' });
        if (!res.ok) throw new Error('Failed to reset database');
        return res.json();
    },

    // EXPORT CONFIG
    exportConfig: async () => {
        const [projects, education, experience, certifications, messages] = await Promise.all([
            portfolioDb.getProjects(),
            portfolioDb.getEducation(),
            portfolioDb.getExperience(),
            portfolioDb.getCertifications(),
            portfolioDb.getMessages()
        ]);
        const data = { projects, education, experience, certifications, messages };
        return JSON.stringify(data, null, 2);
    },

    // IMPORT CONFIG
    importConfig: async (jsonString) => {
        try {
            const data = JSON.parse(jsonString);
            const res = await fetch('/api/import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to import config');
            return true;
        } catch (e) {
            console.error("Failed to import config", e);
            return false;
        }
    }
};
