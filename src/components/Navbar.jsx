import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX, FiDownload } from 'react-icons/fi'
import './Navbar.css'

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', h)
        return () => window.removeEventListener('scroll', h)
    }, [])

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-inner">
                <a href="#home" className="nav-logo">
                    <span className="logo-lt">&lt;</span>Narasing<span className="logo-accent"></span><span className="logo-lt">/&gt;</span>
                </a>

                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.label}>
                            <a href={link.href} className="nav-link" onClick={() => setMenuOpen(false)}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a href="src\assets\resume.pdf" download className="btn-primary nav-resume">
                            <FiDownload size={14} /> Resume
                        </a>
                    </li>
                </ul>

                <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </div>
        </nav>
    )
}
