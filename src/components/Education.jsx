import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiBook, FiBriefcase, FiCalendar, FiMapPin, FiArrowRight } from 'react-icons/fi'
import { portfolioDb } from '../utils/portfolioDb'
import './Education.css'

export function TimelineCard({ item }) {
    const icon = item.type === 'edu' ? <FiBook /> : <FiBriefcase />
    
    return (
        <div className="tl-card glass">
            <div className="tl-dot">{icon}</div>
            <div className="tl-body">
                <div className="tl-top">
                    <div>
                        <h3 className="tl-title">{item.title}</h3>
                        <p className="tl-org">{item.org}</p>
                    </div>
                    {item.badge && <span className="tl-badge">{item.badge}</span>}
                </div>
                <div className="tl-meta">
                    <span><FiCalendar size={12} /> {item.period}</span>
                    <span><FiMapPin size={12} /> {item.location}</span>
                </div>
                {item.desc && <p className="tl-desc">{item.desc}</p>}
            </div>
        </div>
    )
}

export default function Education() {
    const [eduList] = useState(() => portfolioDb.getEducation())
    const [expList] = useState(() => portfolioDb.getExperience())

    const firstEdu = eduList[0]
    const firstExp = expList[0]

    return (
        <section id="education" className="edu section">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">My Journey</span>
                    <h2 className="section-title">Education &amp; Experience</h2>
                    <p className="section-sub">My academic background and professional journey.</p>
                </div>

                <div className="edu-preview-grid">
                    {firstEdu && <TimelineCard item={firstEdu} />}
                    {firstExp && <TimelineCard item={firstExp} />}
                </div>

                <div className="view-all-wrap">
                    <Link to="/education" className="btn-viewall">
                        View Full Journey <FiArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    )
}

