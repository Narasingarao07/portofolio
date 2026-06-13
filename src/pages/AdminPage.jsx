import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
    FiPlus, FiEdit2, FiTrash2, FiDownload, FiUpload, 
    FiRefreshCw, FiLogOut, FiArrowLeft, FiFolder, 
    FiAward, FiBook, FiBriefcase, FiX, FiCalendar, 
    FiMapPin, FiCheck 
} from 'react-icons/fi'
import { portfolioDb } from '../utils/portfolioDb'
import './AdminPage.css'

const GRADIENTS = [
    'linear-gradient(135deg,#5c6bff,#a78bfa)', // Blue-Purple
    'linear-gradient(135deg,#10b981,#34d399)', // Green
    'linear-gradient(135deg,#f59e0b,#fbbf24)', // Orange
    'linear-gradient(135deg,#ef4444,#f87171)', // Red
    'linear-gradient(135deg,#3b82f6,#60a5fa)', // Sky Blue
    'linear-gradient(135deg,#8b5cf6,#a78bfa)', // Indigo
];

export default function AdminPage() {
    const [isAuthenticated] = useState(() => sessionStorage.getItem('nrt_portfolio_admin_auth') === 'true')
    const [activeTab, setActiveTab] = useState('projects') // projects, certs, edu, exp
    
    // Data list states
    const [projects, setProjects] = useState(() => portfolioDb.getProjects())
    const [certs, setCerts] = useState(() => portfolioDb.getCertifications())
    const [education, setEducation] = useState(() => portfolioDb.getEducation())
    const [experience, setExperience] = useState(() => portfolioDb.getExperience())

    // Modal state
    const [modalOpen, setModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState(null) // null for Adding, item object for Editing

    // Form fields
    const [formTitle, setFormTitle] = useState('')
    const [formDesc, setFormDesc] = useState('')
    const [formTech, setFormTech] = useState('') // comma-separated
    const [formGithub, setFormGithub] = useState('')
    const [formLive, setFormLive] = useState('')
    const [formGradient, setFormGradient] = useState(GRADIENTS[0])
    const [formLetter, setFormLetter] = useState('')
    const [formFeatured, setFormFeatured] = useState(false)

    // Certification fields
    const [formIssuer, setFormIssuer] = useState('')
    const [formDate, setFormDate] = useState('')
    const [formIcon, setFormIcon] = useState('🏆')
    const [formTags, setFormTags] = useState('') // comma-separated
    const [formLink, setFormLink] = useState('#')
    const [formColor, setFormColor] = useState('#5c6bff')
    const [formAttachment, setFormAttachment] = useState('')

    // Education & Experience fields
    const [formOrg, setFormOrg] = useState('')
    const [formPeriod, setFormPeriod] = useState('')
    const [formLocation, setFormLocation] = useState('')
    const [formBadge, setFormBadge] = useState('')

    const fileInputRef = useRef(null)
    const navigate = useNavigate()

    const refreshAllData = () => {
        setProjects(portfolioDb.getProjects());
        setCerts(portfolioDb.getCertifications());
        setEducation(portfolioDb.getEducation());
        setExperience(portfolioDb.getExperience());
    }

    // Authentication Gate
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem('nrt_portfolio_admin_auth');
        navigate('/');
    }

    // Reset Form Fields
    const resetForm = (item = null) => {
        setEditingItem(item);
        if (item) {
            // Populate form fields for edit mode
            setFormTitle(item.title || '');
            setFormDesc(item.desc || '');
            setFormOrg(item.org || '');
            setFormPeriod(item.period || '');
            setFormLocation(item.location || '');
            setFormBadge(item.badge || '');
            setFormTech(item.tech ? item.tech.join(', ') : '');
            setFormGithub(item.github || '');
            setFormLive(item.live || '');
            setFormGradient(item.gradient || GRADIENTS[0]);
            setFormLetter(item.letter || '');
            setFormFeatured(item.featured || false);
            setFormIssuer(item.issuer || '');
            setFormDate(item.date || '');
            setFormIcon(item.icon || '🏆');
            setFormTags(item.tags ? item.tags.join(', ') : '');
            setFormLink(item.link || '#');
            setFormColor(item.color || '#5c6bff');
            setFormAttachment(item.attachment || '');
        } else {
            // Initialize for new mode
            setFormTitle('');
            setFormDesc('');
            setFormOrg('');
            setFormPeriod('');
            setFormLocation('');
            setFormBadge('');
            setFormTech('');
            setFormGithub('');
            setFormLive('');
            setFormGradient(GRADIENTS[0]);
            setFormLetter('');
            setFormFeatured(false);
            setFormIssuer('');
            setFormDate('');
            setFormIcon('🏆');
            setFormTags('');
            setFormLink('#');
            setFormColor('#5c6bff');
            setFormAttachment('');
        }
    }

    const openAddModal = () => {
        resetForm(null);
        setModalOpen(true);
    }

    const openEditModal = (item) => {
        resetForm(item);
        setModalOpen(true);
    }

    // CRUD: Save item
    const handleSave = (e) => {
        e.preventDefault();
        
        if (activeTab === 'projects') {
            const parsedTech = formTech.split(',').map(s => s.trim()).filter(Boolean);
            const calculatedLetter = formLetter ? formLetter.trim() : (formTitle ? formTitle.trim().substring(0, 2).toUpperCase() : 'P');
            const projectData = {
                title: formTitle,
                desc: formDesc,
                tech: parsedTech,
                github: formGithub,
                live: formLive || null,
                gradient: formGradient,
                letter: calculatedLetter,
                featured: formFeatured
            };
            if (editingItem) {
                portfolioDb.updateProject(editingItem.id, projectData);
            } else {
                portfolioDb.addProject(projectData);
            }
        } 
        else if (activeTab === 'certs') {
            const parsedTags = formTags.split(',').map(s => s.trim()).filter(Boolean);
            const certData = {
                title: formTitle,
                issuer: formIssuer,
                date: formDate,
                icon: formIcon,
                tags: parsedTags,
                link: formLink,
                color: formColor,
                attachment: formAttachment || null
            };
            if (editingItem) {
                portfolioDb.updateCertification(editingItem.id, certData);
            } else {
                portfolioDb.addCertification(certData);
            }
        } 
        else if (activeTab === 'edu') {
            const eduData = {
                title: formTitle,
                org: formOrg,
                period: formPeriod,
                location: formLocation,
                badge: formBadge || null,
                desc: formDesc,
                type: 'edu',
                icon: 'book'
            };
            if (editingItem) {
                portfolioDb.updateEducation(editingItem.id, eduData);
            } else {
                portfolioDb.addEducation(eduData);
            }
        }
        else if (activeTab === 'exp') {
            const expData = {
                title: formTitle,
                org: formOrg,
                period: formPeriod,
                location: formLocation,
                badge: formBadge || null,
                desc: formDesc,
                type: 'exp',
                icon: 'briefcase'
            };
            if (editingItem) {
                portfolioDb.updateExperience(editingItem.id, expData);
            } else {
                portfolioDb.addExperience(expData);
            }
        }

        refreshAllData();
        setModalOpen(false);
    }

    // CRUD: Delete item
    const handleDelete = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            if (activeTab === 'projects') {
                portfolioDb.deleteProject(id);
            } else if (activeTab === 'certs') {
                portfolioDb.deleteCertification(id);
            } else if (activeTab === 'edu') {
                portfolioDb.deleteEducation(id);
            } else if (activeTab === 'exp') {
                portfolioDb.deleteExperience(id);
            }
            refreshAllData();
        }
    }

    // GLOBAL ACTIONS
    const handleExport = () => {
        const jsonString = portfolioDb.exportConfig();
        const dataBlob = new Blob([jsonString], { type: 'application/json' });
        const downloadUrl = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'portfolio_config.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
    }

    const handleImportTrigger = () => {
        fileInputRef.current.click();
    }

    const handleImportFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const success = portfolioDb.importConfig(evt.target.result);
            if (success) {
                alert('Portfolio data imported successfully!');
                refreshAllData();
            } else {
                alert('Invalid file format. Please upload a valid config JSON.');
            }
        };
        reader.readAsText(file);
        // Clear input value so same file can be imported again
        e.target.value = '';
    }

    const handleReset = () => {
        if (window.confirm('This will wipe all custom entries and restore the default portfolio data. Are you sure?')) {
            portfolioDb.resetToDefaults();
            refreshAllData();
            alert('Default portfolio data restored.');
        }
    }

    const handleAttachmentChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Limit size to 1.5MB
        if (file.size > 1.5 * 1024 * 1024) {
            alert('To optimize local storage, please select an image or PDF under 1.5MB.');
            e.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (evt) => {
            setFormAttachment(evt.target.result);
        };
        reader.readAsDataURL(file);
    }

    if (!isAuthenticated) {
        return null; // or loading spinner, handled by navigate redirection
    }

    return (
        <div className="admin-page">
            {/* Header Navbar */}
            <nav className="admin-nav">
                <div className="container admin-nav-inner">
                    <div className="admin-logo">
                        <span>NRT</span> Workspace
                    </div>
                    <div className="admin-nav-actions">
                        <Link to="/" className="btn-nav-action btn-outline">
                            <FiArrowLeft /> Back to Site
                        </Link>
                        <button onClick={handleLogout} className="btn-nav-action logout">
                            <FiLogOut /> Log Out
                        </button>
                    </div>
                </div>
            </nav>

            {/* Banner */}
            <header className="admin-banner container">
                <div className="admin-banner-inner">
                    <div className="admin-title">
                        <h1>Manage Content</h1>
                        <p>Manually insert or update your projects, credentials, and journey timeline cards.</p>
                    </div>
                    <div className="admin-global-actions">
                        <button onClick={handleExport} className="btn-global">
                            <FiDownload /> Export JSON
                        </button>
                        <button onClick={handleImportTrigger} className="btn-global">
                            <FiUpload /> Import JSON
                        </button>
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            accept=".json" 
                            className="hidden-file-input"
                            onChange={handleImportFile}
                        />
                        <button onClick={handleReset} className="btn-global reset">
                            <FiRefreshCw /> Reset Defaults
                        </button>
                    </div>
                </div>
            </header>

            {/* Dashboard Tabs */}
            <section className="container">
                <div className="admin-tabs">
                    <div 
                        className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        <FiFolder /> Projects
                    </div>
                    <div 
                        className={`admin-tab-btn ${activeTab === 'certs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('certs')}
                    >
                        <FiAward /> Certifications
                    </div>
                    <div 
                        className={`admin-tab-btn ${activeTab === 'edu' ? 'active' : ''}`}
                        onClick={() => setActiveTab('edu')}
                    >
                        <FiBook /> Education
                    </div>
                    <div 
                        className={`admin-tab-btn ${activeTab === 'exp' ? 'active' : ''}`}
                        onClick={() => setActiveTab('exp')}
                    >
                        <FiBriefcase /> Experience
                    </div>
                </div>

                {/* Tab Content Dashboard */}
                <div className="admin-content">
                    <div className="admin-content-header">
                        <h2>
                            {activeTab === 'projects' && 'Projects List'}
                            {activeTab === 'certs' && 'Certifications List'}
                            {activeTab === 'edu' && 'Education Timeline'}
                            {activeTab === 'exp' && 'Experience Timeline'}
                        </h2>
                        <button onClick={openAddModal} className="btn-add-new">
                            <FiPlus /> Add New Card
                        </button>
                    </div>

                    {/* Dynamic Lists */}
                    <div className="admin-list">
                        {activeTab === 'projects' && (
                            projects.length === 0 ? <EmptyState /> :
                            projects.map(p => (
                                <div key={p.id} className="admin-item-card">
                                    <div className="item-info-wrapper">
                                        <div className="item-preview-visual" style={{ background: p.gradient }}>
                                            {p.letter}
                                        </div>
                                        <div className="item-main-details">
                                            <div className="item-title-row">
                                                <h3>{p.title}</h3>
                                                {p.featured && <span className="item-badge">Featured</span>}
                                            </div>
                                            <div className="item-sub-details">
                                                <span>{p.tech.join(', ')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-actions">
                                        <button onClick={() => openEditModal(p)} className="btn-action edit" title="Edit"><FiEdit2 /></button>
                                        <button onClick={() => handleDelete(p.id, p.title)} className="btn-action delete" title="Delete"><FiTrash2 /></button>
                                    </div>
                                </div>
                            ))
                        )}

                        {activeTab === 'certs' && (
                            certs.length === 0 ? <EmptyState /> :
                            certs.map(c => (
                                <div key={c.id} className="admin-item-card">
                                    <div className="item-info-wrapper">
                                        <div className="item-preview-visual" style={{ background: `${c.color}20`, color: c.color, border: `1px solid ${c.color}30` }}>
                                            {c.icon}
                                        </div>
                                        <div className="item-main-details">
                                            <div className="item-title-row">
                                                <h3>{c.title}</h3>
                                                {c.attachment && <span className="item-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.2)' }}>Has Media</span>}
                                            </div>
                                            <div className="item-sub-details">
                                                <span>{c.issuer}</span>
                                                <span>•</span>
                                                <span>{c.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-actions">
                                        <button onClick={() => openEditModal(c)} className="btn-action edit" title="Edit"><FiEdit2 /></button>
                                        <button onClick={() => handleDelete(c.id, c.title)} className="btn-action delete" title="Delete"><FiTrash2 /></button>
                                    </div>
                                </div>
                            ))
                        )}

                        {activeTab === 'edu' && (
                            education.length === 0 ? <EmptyState /> :
                            education.map(e => (
                                <div key={e.id} className="admin-item-card">
                                    <div className="item-info-wrapper">
                                        <div className="item-preview-visual" style={{ background: 'rgba(92, 107, 255, 0.12)', color: 'var(--accent-2)' }}>
                                            <FiBook />
                                        </div>
                                        <div className="item-main-details">
                                            <div className="item-title-row">
                                                <h3>{e.title}</h3>
                                                {e.badge && <span className="item-badge">{e.badge}</span>}
                                            </div>
                                            <div className="item-sub-details">
                                                <span>{e.org}</span>
                                                <span>•</span>
                                                <span><FiCalendar size={12} /> {e.period}</span>
                                                <span>•</span>
                                                <span><FiMapPin size={12} /> {e.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-actions">
                                        <button onClick={() => openEditModal(e)} className="btn-action edit" title="Edit"><FiEdit2 /></button>
                                        <button onClick={() => handleDelete(e.id, e.title)} className="btn-action delete" title="Delete"><FiTrash2 /></button>
                                    </div>
                                </div>
                            ))
                        )}

                        {activeTab === 'exp' && (
                            experience.length === 0 ? <EmptyState /> :
                            experience.map(x => (
                                <div key={x.id} className="admin-item-card">
                                    <div className="item-info-wrapper">
                                        <div className="item-preview-visual" style={{ background: 'rgba(167, 139, 250, 0.12)', color: 'var(--accent-2)' }}>
                                            <FiBriefcase />
                                        </div>
                                        <div className="item-main-details">
                                            <div className="item-title-row">
                                                <h3>{x.title}</h3>
                                                {x.badge && <span className="item-badge">{x.badge}</span>}
                                            </div>
                                            <div className="item-sub-details">
                                                <span>{x.org}</span>
                                                <span>•</span>
                                                <span><FiCalendar size={12} /> {x.period}</span>
                                                <span>•</span>
                                                <span><FiMapPin size={12} /> {x.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-actions">
                                        <button onClick={() => openEditModal(x)} className="btn-action edit" title="Edit"><FiEdit2 /></button>
                                        <button onClick={() => handleDelete(x.id, x.title)} className="btn-action delete" title="Delete"><FiTrash2 /></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Unified Modal Dialog */}
            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <div className="modal-header">
                            <h3>
                                {editingItem ? 'Edit Card Details' : 'Add New Card'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="btn-modal-close">
                                <FiX />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSave}>
                            <div className="modal-body">
                                <div className="modal-form">
                                    {/* TITLE / NAME (Common) */}
                                    <div className="form-group">
                                        <label className="form-label">
                                            {activeTab === 'projects' && 'Project Title'}
                                            {activeTab === 'certs' && 'Certification Name'}
                                            {activeTab === 'edu' && 'Course/Degree Title'}
                                            {activeTab === 'exp' && 'Job/Role Title'}
                                        </label>
                                        <input 
                                            type="text" 
                                            required 
                                            className="form-input" 
                                            style={{ paddingLeft: '16px' }}
                                            placeholder="e.g. Full-Stack Dev E-commerce"
                                            value={formTitle}
                                            onChange={(e) => setFormTitle(e.target.value)}
                                        />
                                    </div>

                                    {/* PROJECTS SPECIAL FORM FIELDS */}
                                    {activeTab === 'projects' && (
                                        <>
                                            <div className="form-group">
                                                <label className="form-label">Description</label>
                                                <textarea 
                                                    rows="3" 
                                                    required 
                                                    className="form-input" 
                                                    style={{ paddingLeft: '16px', resize: 'vertical' }}
                                                    placeholder="Short summary of the project..."
                                                    value={formDesc}
                                                    onChange={(e) => setFormDesc(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Technologies (Comma-separated)</label>
                                                <input 
                                                    type="text" 
                                                    required 
                                                    className="form-input" 
                                                    style={{ paddingLeft: '16px' }}
                                                    placeholder="React, Firebase, Node.js"
                                                    value={formTech}
                                                    onChange={(e) => setFormTech(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label className="form-label">GitHub URL</label>
                                                    <input 
                                                        type="url" 
                                                        required 
                                                        className="form-input" 
                                                        style={{ paddingLeft: '16px' }}
                                                        placeholder="https://github.com/..."
                                                        value={formGithub}
                                                        onChange={(e) => setFormGithub(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Live Demo URL (Optional)</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-input" 
                                                        style={{ paddingLeft: '16px' }}
                                                        placeholder="https://..."
                                                        value={formLive}
                                                        onChange={(e) => setFormLive(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row" style={{ alignItems: 'center' }}>
                                                <div className="form-group">
                                                    <label className="form-label">Card Letter/Abbreviation</label>
                                                    <input 
                                                        type="text" 
                                                        maxLength="3" 
                                                        className="form-input" 
                                                        style={{ paddingLeft: '16px' }}
                                                        placeholder="E.g. F"
                                                        value={formLetter}
                                                        onChange={(e) => setFormLetter(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
                                                    <input 
                                                        id="chk-featured"
                                                        type="checkbox" 
                                                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                                        checked={formFeatured}
                                                        onChange={(e) => setFormFeatured(e.target.checked)}
                                                    />
                                                    <label htmlFor="chk-featured" className="form-label" style={{ cursor: 'pointer', margin: 0 }}>
                                                        Show as Featured Project
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Card Accent Gradient</label>
                                                <div className="gradient-presets">
                                                    {GRADIENTS.map((g, i) => (
                                                        <div 
                                                            key={i} 
                                                            className={`gradient-dot ${formGradient === g ? 'selected' : ''}`}
                                                            style={{ background: g }}
                                                            onClick={() => setFormGradient(g)}
                                                        >
                                                            {formGradient === g && <FiCheck style={{ color: '#fff', margin: '8px' }} />}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* CERTIFICATIONS SPECIAL FORM FIELDS */}
                                    {activeTab === 'certs' && (
                                        <>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label className="form-label">Issuer Organization</label>
                                                    <input 
                                                        type="text" 
                                                        required 
                                                        className="form-input" 
                                                        style={{ paddingLeft: '16px' }}
                                                        placeholder="e.g. AWS, Oracle, IBM"
                                                        value={formIssuer}
                                                        onChange={(e) => setFormIssuer(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Date (Issued)</label>
                                                    <input 
                                                        type="text" 
                                                        required 
                                                        className="form-input" 
                                                        style={{ paddingLeft: '16px' }}
                                                        placeholder="e.g. Jul 2025, 2024"
                                                        value={formDate}
                                                        onChange={(e) => setFormDate(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label className="form-label">Badge Emoji Icon</label>
                                                    <input 
                                                        type="text" 
                                                        required 
                                                        maxLength="2" 
                                                        className="form-input" 
                                                        style={{ paddingLeft: '16px', fontSize: '1.2rem' }}
                                                        placeholder="🏆, ☁️, 🚀, 🐍"
                                                        value={formIcon}
                                                        onChange={(e) => setFormIcon(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Credential Color Theme</label>
                                                    <input 
                                                        type="color" 
                                                        className="form-input" 
                                                        style={{ padding: '6px', height: '48px', cursor: 'pointer' }}
                                                        value={formColor}
                                                        onChange={(e) => setFormColor(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Skills/Tags (Comma-separated)</label>
                                                <input 
                                                    type="text" 
                                                    required 
                                                    className="form-input" 
                                                    style={{ paddingLeft: '16px' }}
                                                    placeholder="Cloud, Devops, Security"
                                                    value={formTags}
                                                    onChange={(e) => setFormTags(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Certificate Link URL (Optional)</label>
                                                <input 
                                                    type="text" 
                                                    className="form-input" 
                                                    style={{ paddingLeft: '16px' }}
                                                    placeholder="https://..."
                                                    value={formLink}
                                                    onChange={(e) => setFormLink(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Upload Certificate (Image or PDF under 1.5MB)</label>
                                                <input 
                                                    type="file" 
                                                    accept="image/*,application/pdf"
                                                    className="form-input" 
                                                    style={{ paddingLeft: '16px', paddingTop: '10px' }}
                                                    onChange={handleAttachmentChange}
                                                />
                                                {formAttachment && (
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                                        <span style={{ fontSize: '0.85rem', color: 'var(--accent-2)', fontWeight: '600' }}>Attachment Loaded</span>
                                                        <button 
                                                            type="button" 
                                                            onClick={() => setFormAttachment('')} 
                                                            style={{ fontSize: '0.8rem', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '5px 12px', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.05)', fontWeight: '600', transition: 'var(--transition)' }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}

                                    {/* EDUCATION & EXPERIENCE SPECIAL FORM FIELDS */}
                                    {(activeTab === 'edu' || activeTab === 'exp') && (
                                        <>
                                            <div className="form-group">
                                                <label className="form-label">
                                                    {activeTab === 'edu' ? 'School / Institution Name' : 'Company / Employer Name'}
                                                </label>
                                                <input 
                                                    type="text" 
                                                    required 
                                                    className="form-input" 
                                                    style={{ paddingLeft: '16px' }}
                                                    placeholder="e.g. Gayatri Vidya Parishad College"
                                                    value={formOrg}
                                                    onChange={(e) => setFormOrg(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label className="form-label">Time Period</label>
                                                    <input 
                                                        type="text" 
                                                        required 
                                                        className="form-input" 
                                                        style={{ paddingLeft: '16px' }}
                                                        placeholder="e.g. 2024 - Present, May 2024"
                                                        value={formPeriod}
                                                        onChange={(e) => setFormPeriod(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Location</label>
                                                    <input 
                                                        type="text" 
                                                        required 
                                                        className="form-input" 
                                                        style={{ paddingLeft: '16px' }}
                                                        placeholder="e.g. Remote, Andhra Pradesh"
                                                        value={formLocation}
                                                        onChange={(e) => setFormLocation(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Badge/Score (Optional)</label>
                                                <input 
                                                    type="text" 
                                                    className="form-input" 
                                                    style={{ paddingLeft: '16px' }}
                                                    placeholder="e.g. CGPA: 8.2/10, score: 9.4/10"
                                                    value={formBadge}
                                                    onChange={(e) => setFormBadge(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Details / Description</label>
                                                <textarea 
                                                    rows="3" 
                                                    required 
                                                    className="form-input" 
                                                    style={{ paddingLeft: '16px', resize: 'vertical' }}
                                                    placeholder="Key takeaways, learnings, or responsibilities..."
                                                    value={formDesc}
                                                    onChange={(e) => setFormDesc(e.target.value)}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={() => setModalOpen(false)} className="btn-modal-action cancel">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-modal-action save">
                                    Save Details
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

function EmptyState() {
    return (
        <div className="admin-empty-state">
            <FiRefreshCw size={36} />
            <p>No cards found in this category. Click 'Add New Card' to insert one manually.</p>
        </div>
    )
}
