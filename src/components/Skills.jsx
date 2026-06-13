import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { SiReact, SiJavascript, SiPython, SiNodedotjs, SiMongodb, SiMysql, SiHtml5, SiCss3, SiGit, SiDocker, SiTailwindcss, SiFirebase, SiC, SiCplusplus, SiLinux, SiDjango, SiPostgresql, SiGooglecloud } from 'react-icons/si'
import './Skills.css'

export const allSkills = [
    { name: 'React', icon: <SiReact />, cat: 'Frontend' },
    { name: 'JavaScript', icon: <SiJavascript />, cat: 'Frontend' },
    { name: 'Python', icon: <SiPython />, cat: 'Backend' },
    { name: 'Django', icon: <SiDjango />, cat: 'Backend' },
    { name: 'Node.js', icon: <SiNodedotjs />, cat: 'Backend' },
    { name: 'Docker', icon: <SiDocker />, cat: 'DevOps' },
    { name: 'GCP', icon: <SiGooglecloud />, cat: 'Cloud' },
    { name: 'Git/GitHub', icon: <SiGit />, cat: 'DevOps' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, cat: 'Database' },
    { name: 'MongoDB', icon: <SiMongodb />, cat: 'Database' },
    { name: 'Tailwind', icon: <SiTailwindcss />, cat: 'Frontend' },
]

export default function Skills() {
    // Duplicate skills for smooth infinite scroll marquee
    const marqueeSkills = [...allSkills, ...allSkills]

    return (
        <section id="skills" className="skills-marquee-section section">
            <div className="container">
                <div className="section-header center">
                    <h2 className="section-title arsenal-title">Technical Arsenal</h2>
                    <p className="section-sub">Technologies powering my missions</p>
                    <div className="page-header-line" />
                </div>
            </div>

            <div className="skills-marquee-container">
                <div className="skills-marquee-track">
                    {marqueeSkills.map((s, i) => (
                        <div key={i} className="skill-item-card glass">
                            <div className="skill-item-icon">{s.icon}</div>
                            <h3 className="skill-item-name">{s.name}</h3>
                            <p className="skill-item-cat">{s.cat}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="view-all-wrap center">
                <Link to="/skills" className="btn-viewall">
                    View All Skills <FiArrowRight />
                </Link>
            </div>
        </section>
    )
}
