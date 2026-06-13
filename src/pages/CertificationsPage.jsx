import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { CertCard } from '../components/Certifications'
import { portfolioDb } from '../utils/portfolioDb'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function CertificationsPage() {
    const [certs] = useState(() => portfolioDb.getCertifications())

    return (
        <div className="sub-page">
            <nav className="page-nav">
                <div className="container page-nav-inner">
                    <Link to="/" className="page-nav-back"><FiArrowLeft /> Back to Home</Link>
                    <span className="page-nav-title">All Certifications</span>
                </div>
            </nav>

            <header className="page-header container">
                <h1>Certifications</h1>
                <p>Professional certifications and industry-recognized achievements from global entities.</p>
                <div className="page-header-line" />
            </header>

            <section className="container section">
                <div className="cert-grid">
                    {certs.map((c, i) => (
                        <CertCard key={c.id || i} c={c} />
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    )
}

