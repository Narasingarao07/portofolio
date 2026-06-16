import { FiArrowRight, FiMail, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'
import './Hero.css'
import profile from "../assets/first.jpg"

export default function Hero() {
    return (
        <section id="home" className="hero section">
            {/* Animated mesh background */}
            <div className="hero-mesh">
                <div className="mesh-blob blob-1" />
                <div className="mesh-blob blob-2" />
                <div className="mesh-blob blob-3" />
                <div className="hero-grid-lines" />
            </div>

            <div className="container hero-inner">
                <div className="hero-content">
                    <div className="hero-status">
                        <span className="status-dot" />
                        <span>Available for Opportunities</span>
                    </div>
                    <p className="hero-greeting">Hello, I'm</p>
                    <h1 className="hero-name">
                        Narasinga Rao<br />
                        <span className="hero-name-accent">Tammineni</span>
                    </h1>
                    <p className="hero-tagline">
                        A passionate <span className="hero-hl">Full-Stack Developer</span> &amp; CS
                        student crafting clean, impactful digital experiences using modern web technologies.
                    </p>

                    <div className="hero-cta">
                        <a href="#projects" className="btn-primary">
                            View My Work <FiArrowRight />
                        </a>
                        <a href="#contact" className="btn-outline">
                            <FiMail /> Contact Me
                        </a>
                    </div>

                    <div className="hero-socials">
                        <a href="https://github.com/Narasingarao07" target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
                        <a href="https://www.linkedin.com/in/narasinga-rao-tammineni-661bb1305/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
                        <a href="https://www.instagram.com/narasingarao118/" target="_blank" rel="noreferrer" aria-label="Twitter"><FiInstagram /></a>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="avatar-container">
                        <div className="avatar-glow" />
                        <div className="avatar-ring r1" />
                        <div className="avatar-ring r2" />
                        <div className="avatar-ring r3" />
                        <div className="avatar-core glass">
                            <img src={profile} alt="Profile" />
                        </div>
                        {/* Floating chips */}
                        <div className="chip chip-1 glass"><span>⚛️</span> React</div>
                        <div className="chip chip-2 glass"><span>🐍</span> Python</div>
                        <div className="chip chip-3 glass"><span>🌐</span> Node.js</div>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item glass">
                            <span className="stat-n">5+</span>
                            <span className="stat-l">Projects</span>
                        </div>
                        <div className="stat-item glass">
                            <span className="stat-n">6+</span>
                            <span className="stat-l">Certifications</span>
                        </div>
                        <div className="stat-item glass">
                            <span className="stat-n">5+</span>
                            <span className="stat-l">Years Learning</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-hint">
                <div className="scroll-mouse glass">
                    <div className="scroll-wheel" />
                </div>
                <span>Scroll down</span>
            </div>
        </section>
    )
}
