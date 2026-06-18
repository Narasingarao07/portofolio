import { FiCode, FiHeart, FiVideo, FiCoffee } from 'react-icons/fi'
import './About.css'
import profile from "../assets/second.jpg"

export default function About() {
    return (
        <section id="about" className="about section">
            <div className="container about-inner">
                <div className="about-image-col">
                    <div className="about-img-wrap">
                        <div className="about-glow" />
                        <div className="about-avatar glass">
                            <img src={profile} alt="Profile" />
                        </div>
                        <div className="about-badge glass badge-1"><FiCode /><span>Full-Stack Dev</span></div>
                        <div className="about-badge glass badge-2"><FiCoffee /><span>CS Student</span></div>
                    </div>
                </div>

                <div className="about-content">
                    <span className="section-tag">About Me</span>
                    <h2 className="section-title">Who I Am &amp; What I Do</h2>

                    <p className="about-p">
                        I'm <strong>Narasinga Rao Tammineni</strong>, a Computer Science student passionate about
                        building powerful web applications that solve real-world problems. I enjoy working across
                        the full stack — from designing sleek UIs to architecting robust back-end systems.
                    </p>
                    <p className="about-p">
                        When I'm not coding you'll find me exploring new technologies, contributing to open-source,
                        or sharpening my skills through competitive programming challenges.
                    </p>

                    <div className="about-traits">
                        {[
                            { icon: <FiHeart />, t: 'Passionate Learner', d: 'Always curious, always growing, always picking up new skills.' },
                            { icon: <FiVideo />, t: 'Video Editing Enthusiast', d: 'Transforming raw footage into captivating and meaningful content.' },
                        ].map(({ icon, t, d }) => (
                            <div key={t} className="trait glass">
                                <div className="trait-icon">{icon}</div>
                                <div><h4>{t}</h4><p>{d}</p></div>
                            </div>
                        ))}
                    </div>

                    <div className="about-cta">
                        <a href="#contact" className="btn-primary">Get In Touch</a>
                        <a href="/resume.pdf" download className="btn-outline">Download CV</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
