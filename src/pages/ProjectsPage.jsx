import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { ProjectCard } from '../components/Projects'
import { portfolioDb } from '../utils/portfolioDb'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ProjectsPage() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        portfolioDb.getProjects().then(setProjects).catch(console.error);
    }, [])

    return (
        <div className="sub-page">
            <nav className="page-nav">
                <div className="container page-nav-inner">
                    <Link to="/" className="page-nav-back"><FiArrowLeft /> Back to Home</Link>
                    <span className="page-nav-title">All Projects</span>
                </div>
            </nav>

            <header className="page-header container">
                <h1>All Projects</h1>
                <p>A comprehensive collection of my work in web development, event management systems, and innovative solutions.</p>
                <div className="page-header-line" />
            </header>

            <section className="container section">
                <div className="proj-grid">
                    {projects.map((p, i) => (
                        <ProjectCard key={p.id || i} p={p} />
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    )
}

