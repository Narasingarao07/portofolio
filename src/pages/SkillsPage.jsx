import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { allSkills } from '../components/Skills'
import Footer from '../components/Footer'

export default function SkillsPage() {
    // Group skills by category for better full-page display
    const categories = Array.from(new Set(allSkills.map(s => s.cat)))

    return (
        <div className="sub-page">
            <nav className="page-nav">
                <div className="container page-nav-inner">
                    <Link to="/" className="page-nav-back"><FiArrowLeft /> Back to Home</Link>
                    <span className="page-nav-title">Technical Expertise</span>
                </div>
            </nav>

            <header className="page-header container">
                <h1>Technical Arsenal</h1>
                <p>A comprehensive overview of the tools, languages, and technologies I use to build robust digital solutions.</p>
                <div className="page-header-line" />
            </header>

            <section className="container section">
                {categories.map(cat => (
                    <div key={cat} className="skill-category-group" style={{ marginBottom: '60px' }}>
                        <h2 className="section-tag" style={{ marginBottom: '24px' }}>{cat}</h2>
                        <div className="skill-full-grid">
                            {allSkills.filter(s => s.cat === cat).map((s, i) => (
                                <div key={i} className="skill-item-card glass" style={{ width: 'auto', minWidth: 'unset' }}>
                                    <div className="skill-item-icon">{s.icon}</div>
                                    <h3 className="skill-item-name">{s.name}</h3>
                                    <p className="skill-item-cat">{s.cat}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            <Footer />
        </div>
    )
}
