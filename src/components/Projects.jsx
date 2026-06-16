import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi'
import { portfolioDb } from '../utils/portfolioDb'
import './Projects.css'

export function ProjectCard({ p }) {
    return (
        <article className="proj-card glass">
            <div className="proj-thumb" style={{ background: p.gradient }}>
                <span className="proj-letter">{p.letter}</span>
                {p.featured && <span className="proj-featured-badge">★ Featured</span>}
            </div>
            <div className="proj-body">
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-tags">
                    {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <div className="proj-links">
                    <a href={p.github} target="_blank" rel="noreferrer" className="proj-btn-gh">
                        <FiGithub size={14} /> Code
                    </a>
                    {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer" className="proj-btn-live">
                            <FiExternalLink size={14} /> Demo
                        </a>
                    )}
                </div>
            </div>
        </article>
    )
}

export default function Projects() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        portfolioDb.getProjects().then(setProjects).catch(console.error)
    }, [])

    // Show only featured projects on home page, or slice to 3
    const preview = projects.filter(p => p.featured).slice(0, 3)
    const displayList = preview.length > 0 ? preview : projects.slice(0, 3)

    return (
        <section id="projects" className="projects section">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">My Work</span>
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-sub">A collection of projects showcasing my skills and interests.</p>
                </div>

                <div className="proj-grid">
                    {displayList.map(p => <ProjectCard key={p.id || p.title} p={p} />)}
                </div>

                <div className="view-all-wrap">
                    <Link to="/projects" className="btn-viewall">
                        View All Projects <FiArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    )
}

