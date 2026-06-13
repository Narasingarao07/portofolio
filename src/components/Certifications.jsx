import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { FiAward, FiExternalLink, FiArrowRight, FiEye, FiX } from 'react-icons/fi'
import { portfolioDb } from '../utils/portfolioDb'
import './Certifications.css'

export function CertCard({ c }) {
    const [viewerOpen, setViewerOpen] = useState(false)

    const handleOverlayClick = (e) => {
        if (e.target.className === 'cert-viewer-overlay') {
            setViewerOpen(false)
        }
    }

    return (
        <div className="cert-card glass">
            <div className="cert-top">
                <div className="cert-badge" style={{ background: `${c.color}20`, borderColor: `${c.color}40`, color: c.color }}>
                    <span className="cert-emoji">{c.icon}</span>
                </div>
                <div className="cert-actions">
                    {c.attachment && (
                        <button onClick={() => setViewerOpen(true)} className="cert-view-btn" title="View Certificate">
                            <FiEye />
                        </button>
                    )}
                    {c.link && c.link !== '#' && (
                        <a href={c.link} target="_blank" rel="noreferrer" className="cert-ext-link" title="External Link">
                            <FiExternalLink />
                        </a>
                    )}
                </div>
            </div>
            <div className="cert-body">
                <h3 className="cert-title">{c.title}</h3>
                <p className="cert-issuer">{c.issuer}</p>
                <span className="cert-date"><FiAward size={12} /> {c.date}</span>
                <div className="cert-tags">
                    {c.tags.map(t => <span key={t} className="cert-tag">{t}</span>)}
                </div>
            </div>

            {/* Lightbox Modal for PDF or Image View */}
            {viewerOpen && c.attachment && createPortal(
                <div className="cert-viewer-overlay" onClick={handleOverlayClick}>
                    <div className="cert-viewer-container">
                        <div className="cert-viewer-header">
                            <h3>{c.title} — Credential View</h3>
                            <button onClick={() => setViewerOpen(false)} className="cert-viewer-close" title="Close Window">
                                <FiX />
                            </button>
                        </div>
                        <div className="cert-viewer-body">
                            {c.attachment.startsWith('data:application/pdf') ? (
                                <iframe 
                                    src={c.attachment} 
                                    title={c.title} 
                                    className="cert-viewer-iframe"
                                />
                            ) : (
                                <img 
                                    src={c.attachment} 
                                    alt={c.title} 
                                    className="cert-viewer-img"
                                />
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}


export default function Certifications() {
    const [certs] = useState(() => portfolioDb.getCertifications())

    const preview = certs.slice(0, 3);
    return (
        <section id="certifications" className="certs section">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Achievements</span>
                    <h2 className="section-title">Certifications</h2>
                    <p className="section-sub">Professional certifications and industry-recognized achievements.</p>
                </div>

                <div className="cert-grid">
                    {preview.map((c, i) => (
                        <CertCard key={c.id || i} c={c} />
                    ))}
                </div>

                <div className="view-all-wrap">
                    <Link to="/certifications" className="btn-viewall">
                        View All Certifications <FiArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    )
}

