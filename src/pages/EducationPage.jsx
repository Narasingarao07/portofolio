import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiBook, FiBriefcase } from 'react-icons/fi'
import { TimelineCard } from '../components/Education'
import { portfolioDb } from '../utils/portfolioDb'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function EducationPage() {
    const [eduList, setEduList] = useState([])
    const [expList, setExpList] = useState([])

    useEffect(() => {
        portfolioDb.getEducation().then(setEduList).catch(console.error);
        portfolioDb.getExperience().then(setExpList).catch(console.error);
    }, [])

    return (
        <div className="sub-page">
            <nav className="page-nav">
                <div className="container page-nav-inner">
                    <Link to="/" className="page-nav-back"><FiArrowLeft /> Back to Home</Link>
                    <span className="page-nav-title">Journey & Experience</span>
                </div>
            </nav>

            <header className="page-header container">
                <h1>The Journey</h1>
                <p>An in-depth look at my academic background and professional experience in the tech industry.</p>
                <div className="page-header-line" />
            </header>

            <section className="container section main-journey">
                <div className="journey-col">
                    <h2 className="colhead"><FiBook /> Academic History</h2>
                    <div className="timeline-v">
                        {eduList.map((e, i) => <TimelineCard key={e.id || i} item={e} />)}
                    </div>
                </div>

                <div className="journey-col mt-60">
                    <h2 className="colhead"><FiBriefcase /> Work Experience</h2>
                    <div className="timeline-v">
                        {expList.map((x, i) => <TimelineCard key={x.id || i} item={x} />)}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

