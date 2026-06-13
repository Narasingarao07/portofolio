import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiArrowLeft, FiAlertCircle } from 'react-icons/fi'
import './LoginPage.css'

// Secure hashes for the credentials
const EMAIL_HASH = 'ca76f03d1cc3186f16d0c47220dbf7fa973fa73c89697911633e570fab953dcf'; // mymailramesh30@gmail.com
const PASS_HASH = 'b1888f2c873d61009582797a71aaca8d53699d8ad2c9b8a7cff61cff67762cdb';  // @950540@

// Native SHA-256 helper
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        // If already logged in, redirect to admin immediately
        const isAuth = sessionStorage.getItem('nrt_portfolio_admin_auth') === 'true';
        if (isAuth) {
            navigate('/admin');
        }
    }, [navigate])

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Trim inputs
            const cleanEmail = email.trim().toLowerCase();
            const cleanPass = password;

            // Compute hashes
            const hashedEmail = await sha256(cleanEmail);
            const hashedPass = await sha256(cleanPass);

            if (hashedEmail === EMAIL_HASH && hashedPass === PASS_HASH) {
                // Set authentication flag
                sessionStorage.setItem('nrt_portfolio_admin_auth', 'true');
                navigate('/admin');
            } else {
                setError('Invalid email or password. Please try again.');
            }
        } catch (err) {
            console.error('Hashing failed', err);
            setError('An error occurred during login. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-glow-1"></div>
            <div className="login-glow-2"></div>

            <div className="login-container">
                <Link to="/" className="login-back-btn">
                    <FiArrowLeft /> Back to Website
                </Link>

                <div className="login-card glass">
                    <div className="login-header">
                        <h2>Admin Space</h2>
                        <p>Sign in to manage your portfolio</p>
                    </div>

                    {error && (
                        <div className="login-error">
                            <FiAlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label className="form-label" htmlFor="email-input">Email Address</label>
                            <div className="form-input-wrapper">
                                <input
                                    id="email-input"
                                    type="email"
                                    required
                                    className="form-input"
                                    placeholder="yourname@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                                <FiMail className="form-icon" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password-input">Password</label>
                            <div className="form-input-wrapper">
                                <input
                                    id="password-input"
                                    type="password"
                                    required
                                    className="form-input"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                                <FiLock className="form-icon" />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
