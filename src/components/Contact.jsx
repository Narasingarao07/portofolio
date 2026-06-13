import { useState } from 'react'
import { FiSend, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import './Contact.css'

const info = [
    { icon: <FiMail />, l: 'Email Address', v: 'tammineniramesh67@gmail.com', h: 'mailto:tammineniramesh67@gmail.com' },
    { icon: <FiPhone />, l: 'Phone Number', v: '+91 6302759674', h: 'tel:+916302759674' },
    { icon: <FiMapPin />, l: 'Location', v: 'Srikakulam, Andhra Pradesh, India', h: null },
]

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', timeline: '', message: '' })
    const [sent, setSent] = useState(false)

    const hChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const hSubmit = (e) => {
        e.preventDefault(); setSent(true);
        setTimeout(() => { setSent(false); setForm({ name: '', email: '', company: '', budget: '', timeline: '', message: '' }) }, 3500)
    }

    return (
        <section id="contact" className="contact section">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Get In Touch</span>
                    <h2 className="section-title">Let's Work Together</h2>
                    <p className="section-sub">Have a project in mind or just want to say hello? Drop me a message below.</p>
                </div>

                <div className="contact-inner">
                    <div className="contact-info">
                        {info.map((i, idx) => (
                            <div key={idx} className="info-item glass">
                                <div className="info-icon">{i.icon}</div>
                                <div>
                                    <p className="info-l">{i.l}</p>
                                    {i.h ? <a href={i.h} className="info-v highlight">{i.v}</a> : <p className="info-v">{i.v}</p>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <form className="contact-form glass" onSubmit={hSubmit}>
                        {sent && <div className="form-msg">🚀 Message sent successfully! I'll get back to you soon.</div>}

                        <div className="form-row">
                            <div className="f-grp">
                                <label>Full Name *</label>
                                <input name="name" type="text" placeholder="Your full name" value={form.name} onChange={hChange} required />
                            </div>
                            <div className="f-grp">
                                <label>Email Address *</label>
                                <input name="email" type="email" placeholder="your.email@example.com" value={form.email} onChange={hChange} required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="f-grp">
                                <label>Company (Optional)</label>
                                <input name="company" type="text" placeholder="Your company name" value={form.company} onChange={hChange} />
                            </div>
                            <div className="f-grp">
                                <label>Budget Range</label>
                                <select name="budget" value={form.budget} onChange={hChange}>
                                    <option value="">Select budget range</option>
                                    <option value="low">&lt; $500</option>
                                    <option value="mid">$500 - $2000</option>
                                    <option value="high">$2000+</option>
                                </select>
                            </div>
                        </div>

                        <div className="f-grp">
                            <label>Project Timeline</label>
                            <select name="timeline" value={form.timeline} onChange={hChange}>
                                <option value="">Select timeline</option>
                                <option value="urgent">&lt; 1 month</option>
                                <option value="standard">1 - 3 months</option>
                                <option value="long">3+ months</option>
                            </select>
                        </div>

                        <div className="f-grp">
                            <label>Project Details *</label>
                            <textarea name="message" rows={5} placeholder="Describe your project, goals, requirements..." value={form.message} onChange={hChange} required />
                        </div>

                        <button type="submit" className="btn-viewall form-btn">
                            <FiSend /> Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
