// Database Helper for dynamic portfolio management

const DEFAULT_PROJECTS = [
    {
        id: 'proj_1',
        title: 'Edu Verifier',
        desc: 'A Fraud Certificates Detection Application',
        tech: ['React', 'Node.js', 'MongoDB', 'Express'],
        github: 'https://github.com/',
        live: '#',
        gradient: 'linear-gradient(135deg,#5c6bff,#a78bfa)',
        letter: 'E',
        featured: true,
    },
    {
        id: 'proj_2',
        title: 'Find My Items',
        desc: 'Find the Lost items in the Campus',
        tech: ['React', 'Firebase', 'MangoDB'],
        github: 'https://github.com/Narasingarao07/findmy-campus.git',
        live: 'https://findmy-campus.lovable.app/auth',
        gradient: 'linear-gradient(135deg,#10b981,#34d399)',
        letter: 'F',
        featured: true,
    },
    {
        id: 'proj_3',
        title: 'Sai Ganapathi College Website',
        desc: 'became a part of a team to developa responsive  website showcasing courses, departments, admission portols lot more.',
        tech: ['Django', 'Postgres', 'DigitalOcean', 'Socket.io'],
        github: 'https://github.com/',
        live: '#',
        gradient: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
        letter: 'C',
        featured: true,
    },
    {
        id: 'proj_4',
        title: 'AI Resume Builder',
        desc: 'AI-powered resume builder that generates tailored resumes based on job descriptions.',
        tech: ['React', 'OpenAI API', 'Python', 'FastAPI'],
        github: 'https://github.com/',
        live: '#',
        gradient: 'linear-gradient(135deg,#ef4444,#f87171)',
        letter: 'AI',
        featured: false,
    },
    {
        id: 'proj_5',
        title: 'Weather Now',
        desc: 'Beautiful weather app with real-time forecasts, animated icons, and location search.',
        tech: ['JavaScript', 'OpenWeather API', 'CSS3'],
        github: 'https://github.com/Narasingarao07/Weather_map',
        live: '#',
        gradient: 'linear-gradient(135deg,#3b82f6,#60a5fa)',
        letter: 'W',
        featured: false,
    },
    {
        id: 'proj_6',
        title: 'Library Management System',
        desc: 'A comprehensive library management system that handles book management, member management, and transaction management.',
        tech: ['Django', 'SQLite', 'Python'],
        github: 'https://github.com/Narasingarao07/library_management',
        live: null,
        gradient: 'linear-gradient(135deg,#8b5cf6,#a78bfa)',
        letter: 'T',
        featured: false,
    },
];

const DEFAULT_EDUCATION = [
    {
        id: 'edu_1',
        type: 'edu',
        title: 'B.Tech in Computer Science & Engineering',
        org: 'GVPCE — Gayatri Vidya Parishad College Of Engineering',
        period: '2024 – Present',
        location: 'Andhra Pradesh, India',
        badge: 'CGPA: 8.2/10',
        desc: 'Focused on full-stack development, data structures, algorithms, and cloud computing.',
        icon: 'book',
    },
    {
        id: 'edu_2',
        type: 'edu',
        title: 'Diploma in Computer Science & Engineering',
        org: 'Sai Ganapathi Polytechic College',
        period: '2021 – 2024',
        location: 'Andhra Pradesh, India',
        badge: 'Score: 9.4/10',
        desc: 'Strong foundation in Mathematics, Physics, and Computer Science fundamentals.',
        icon: 'book',
    },
    {
        id: 'edu_3',
        type: 'edu',
        title: '10th SSC',
        org: 'AP MODEL SCHOOL - O.V.PETA',
        period: '2018 - 2020',
        location: 'Andhra Pradesh, India',
        badge: 'CGPA: 9.7/10',
        desc: 'Focused on full-stack development, data structures, algorithms, and cloud computing.',
        icon: 'book',
    },
];

const DEFAULT_EXPERIENCE = [
    {
        id: 'exp_1',
        type: 'exp',
        title: 'Full-Stack Developer Intern',
        org: 'Millinium Software Solutions',
        period: 'May 2024 – Jul 2024',
        location: 'Remote',
        desc: 'Built REST APIs with Node.js & Express, contributed to React dashboard for client reporting.',
        icon: 'briefcase',
    },
    {
        id: 'exp_2',
        type: 'exp',
        title: 'Open Source Contributor',
        org: 'GitHub Community',
        period: '2023 – Present',
        location: 'Remote',
        desc: 'Bug fixes and features in several React and Python open-source projects.',
        icon: 'briefcase',
    },
];

const DEFAULT_CERTS = [
    {
        id: 'cert_1',
        title: 'Python FullStack',
        issuer: 'Millinium Software Solutions Pvt.Ltd.',
        date: 'Issued: 2024',
        icon: '🏆',
        tags: ['Python', 'Django', 'Pandas', 'Numpy', 'Matplotlib'],
        link: '#',
        color: '#3b82f6',
    },
    {
        id: 'cert_2',
        title: 'AWS Cloud Solutions Architect',
        issuer: 'Amazon Web Services',
        date: 'Issued: Jul 2025',
        icon: '☁️',
        tags: ['AWS Services', 'Cloud Architecture', 'Security'],
        link: '#',
        color: '#f59e0b',
    },
    {
        id: 'cert_3',
        title: 'OCI 2025 Certified Developer',
        issuer: 'ORACLE',
        date: 'Issued: Oct 2025',
        icon: '🏢',
        tags: ['Cloud Native', 'Serverless', 'Scalability'],
        link: '#',
        color: '#ef4444',
    },
    {
        id: 'cert_4',
        title: 'Rocket Propulsion Dynamics',
        issuer: 'Kodacy (in collab with ISRO)',
        date: 'Issued: May 2025',
        icon: '🚀',
        tags: ['Aerospace', 'Physics'],
        link: '#',
        color: '#a78bfa',
    },
    {
        id: 'cert_5',
        title: 'Python for Data Science',
        issuer: 'IBM',
        date: 'Issued: Mar 2023',
        icon: '🐍',
        tags: ['Python', 'Data Analysis'],
        link: '#',
        color: '#10b981',
    },
];

const KEYS = {
    projects: 'nrt_portfolio_projects',
    education: 'nrt_portfolio_education',
    experience: 'nrt_portfolio_experience',
    certifications: 'nrt_portfolio_certifications',
};

// Initialize localStorage helper
function initLocalStorage() {
    if (!localStorage.getItem(KEYS.projects)) {
        localStorage.setItem(KEYS.projects, JSON.stringify(DEFAULT_PROJECTS));
    }
    if (!localStorage.getItem(KEYS.education)) {
        localStorage.setItem(KEYS.education, JSON.stringify(DEFAULT_EDUCATION));
    }
    if (!localStorage.getItem(KEYS.experience)) {
        localStorage.setItem(KEYS.experience, JSON.stringify(DEFAULT_EXPERIENCE));
    }
    if (!localStorage.getItem(KEYS.certifications)) {
        localStorage.setItem(KEYS.certifications, JSON.stringify(DEFAULT_CERTS));
    }
}

// Ensure init happens on load
initLocalStorage();

export const portfolioDb = {
    // PROJECTS
    getProjects: () => {
        initLocalStorage();
        return JSON.parse(localStorage.getItem(KEYS.projects)) || [];
    },
    saveProjects: (data) => {
        localStorage.setItem(KEYS.projects, JSON.stringify(data));
    },
    addProject: (proj) => {
        const list = portfolioDb.getProjects();
        const newProj = {
            ...proj,
            id: 'proj_' + Date.now() + Math.floor(Math.random() * 100),
        };
        list.push(newProj);
        portfolioDb.saveProjects(list);
        return newProj;
    },
    updateProject: (id, updatedProj) => {
        const list = portfolioDb.getProjects();
        const index = list.findIndex(p => p.id === id);
        if (index > -1) {
            list[index] = { ...list[index], ...updatedProj };
            portfolioDb.saveProjects(list);
            return list[index];
        }
        return null;
    },
    deleteProject: (id) => {
        const list = portfolioDb.getProjects();
        const filtered = list.filter(p => p.id !== id);
        portfolioDb.saveProjects(filtered);
    },

    // EDUCATION
    getEducation: () => {
        initLocalStorage();
        return JSON.parse(localStorage.getItem(KEYS.education)) || [];
    },
    saveEducation: (data) => {
        localStorage.setItem(KEYS.education, JSON.stringify(data));
    },
    addEducation: (edu) => {
        const list = portfolioDb.getEducation();
        const newEdu = {
            ...edu,
            type: 'edu',
            icon: 'book',
            id: 'edu_' + Date.now() + Math.floor(Math.random() * 100),
        };
        list.push(newEdu);
        portfolioDb.saveEducation(list);
        return newEdu;
    },
    updateEducation: (id, updatedEdu) => {
        const list = portfolioDb.getEducation();
        const index = list.findIndex(e => e.id === id);
        if (index > -1) {
            list[index] = { ...list[index], ...updatedEdu };
            portfolioDb.saveEducation(list);
            return list[index];
        }
        return null;
    },
    deleteEducation: (id) => {
        const list = portfolioDb.getEducation();
        const filtered = list.filter(e => e.id !== id);
        portfolioDb.saveEducation(filtered);
    },

    // EXPERIENCE
    getExperience: () => {
        initLocalStorage();
        return JSON.parse(localStorage.getItem(KEYS.experience)) || [];
    },
    saveExperience: (data) => {
        localStorage.setItem(KEYS.experience, JSON.stringify(data));
    },
    addExperience: (exp) => {
        const list = portfolioDb.getExperience();
        const newExp = {
            ...exp,
            type: 'exp',
            icon: 'briefcase',
            id: 'exp_' + Date.now() + Math.floor(Math.random() * 100),
        };
        list.push(newExp);
        portfolioDb.saveExperience(list);
        return newExp;
    },
    updateExperience: (id, updatedExp) => {
        const list = portfolioDb.getExperience();
        const index = list.findIndex(e => e.id === id);
        if (index > -1) {
            list[index] = { ...list[index], ...updatedExp };
            portfolioDb.saveExperience(list);
            return list[index];
        }
        return null;
    },
    deleteExperience: (id) => {
        const list = portfolioDb.getExperience();
        const filtered = list.filter(e => e.id !== id);
        portfolioDb.saveExperience(filtered);
    },

    // CERTIFICATIONS
    getCertifications: () => {
        initLocalStorage();
        return JSON.parse(localStorage.getItem(KEYS.certifications)) || [];
    },
    saveCertifications: (data) => {
        localStorage.setItem(KEYS.certifications, JSON.stringify(data));
    },
    addCertification: (cert) => {
        const list = portfolioDb.getCertifications();
        const newCert = {
            ...cert,
            id: 'cert_' + Date.now() + Math.floor(Math.random() * 100),
        };
        list.push(newCert);
        portfolioDb.saveCertifications(list);
        return newCert;
    },
    updateCertification: (id, updatedCert) => {
        const list = portfolioDb.getCertifications();
        const index = list.findIndex(c => c.id === id);
        if (index > -1) {
            list[index] = { ...list[index], ...updatedCert };
            portfolioDb.saveCertifications(list);
            return list[index];
        }
        return null;
    },
    deleteCertification: (id) => {
        const list = portfolioDb.getCertifications();
        const filtered = list.filter(c => c.id !== id);
        portfolioDb.saveCertifications(filtered);
    },

    // RESET TO DEFAULTS
    resetToDefaults: () => {
        localStorage.setItem(KEYS.projects, JSON.stringify(DEFAULT_PROJECTS));
        localStorage.setItem(KEYS.education, JSON.stringify(DEFAULT_EDUCATION));
        localStorage.setItem(KEYS.experience, JSON.stringify(DEFAULT_EXPERIENCE));
        localStorage.setItem(KEYS.certifications, JSON.stringify(DEFAULT_CERTS));
    },

    // EXPORT CONFIG
    exportConfig: () => {
        const data = {
            projects: portfolioDb.getProjects(),
            education: portfolioDb.getEducation(),
            experience: portfolioDb.getExperience(),
            certifications: portfolioDb.getCertifications(),
        };
        return JSON.stringify(data, null, 2);
    },

    // IMPORT CONFIG
    importConfig: (jsonString) => {
        try {
            const data = JSON.parse(jsonString);
            if (data.projects && Array.isArray(data.projects)) {
                portfolioDb.saveProjects(data.projects);
            }
            if (data.education && Array.isArray(data.education)) {
                portfolioDb.saveEducation(data.education);
            }
            if (data.experience && Array.isArray(data.experience)) {
                portfolioDb.saveExperience(data.experience);
            }
            if (data.certifications && Array.isArray(data.certifications)) {
                portfolioDb.saveCertifications(data.certifications);
            }
            return true;
        } catch (e) {
            console.error("Failed to import config", e);
            return false;
        }
    }
};
