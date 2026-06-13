import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiTerminal } from 'react-icons/fi'
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-inner">
                <div className="footer-l">
                    <h2 className="footer-logo">Narasinga Rao <span>Tammineni</span></h2>
                    <p className="footer-desc">Building elegant digital solutions for the modern web.</p>
                </div>

                <div className="footer-socials">
                    <a href="https://github.com/Narasingarao07" target='_blank' className="f-soc"><FiGithub /></a>
                    <a href="https://www.linkedin.com/in/narasinga-rao-tammineni-661bb1305/" target='_blank' className="f-soc"><FiLinkedin /></a>
                    <a href="https://www.instagram.com/narasingarao118/" target='_blank' className="f-soc"><FiInstagram /></a>
                    <a href="#" target='_blank' className="f-soc f-red"><FiMail /></a>
                </div>

                <div className="footer-bot">
                    <div className="f-copy">© {new Date().getFullYear()} All Rights Reserved</div>
                    <div>
                        <Link to="/login" className="f-admin-link">Admin Login</Link>
                    </div>
                    <div className="f-dev"><FiTerminal /> Developed by NRT</div>
                </div>
            </div>
        </footer>
    )
}

