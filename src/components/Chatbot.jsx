import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { FiMessageSquare, FiX, FiSend, FiCpu, FiTrash2, FiExternalLink } from 'react-icons/fi'
import './Chatbot.css'

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            role: 'model',
            text: "Hi there! I am Narasinga's AI Assistant. Ask me anything about his skills, experience, projects, education, or resume!"
        }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)
    const location = useLocation()

    // Hide chatbot on admin and login pages
    const isHiddenPath = location.pathname === '/login' || location.pathname === '/admin'

    useEffect(() => {
        if (isOpen) {
            scrollToBottom()
        }
    }, [messages, isOpen])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleSend = async (e, textToSend = input) => {
        if (e) e.preventDefault()
        const trimmedText = textToSend.trim()
        if (!trimmedText || isLoading) return

        // Add user message to state
        const userMsg = { role: 'user', text: trimmedText }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsLoading(true)

        // Keep last 10 messages for context history
        const chatHistory = messages.map(m => ({
            role: m.role,
            text: m.text
        }))

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: trimmedText,
                    history: chatHistory
                })
            })

            const data = await response.json()
            if (response.ok) {
                setMessages(prev => [...prev, { role: 'model', text: data.response }])
            } else {
                setMessages(prev => [
                    ...prev,
                    { role: 'model', text: `Sorry, I encountered an issue: ${data.message || 'Error connecting to Gemini API.'}` }
                ])
            }
        } catch (error) {
            console.error('Chat error:', error)
            setMessages(prev => [
                ...prev,
                { role: 'model', text: "Network error. Make sure the backend server is running and try again." }
            ])
        } finally {
            setIsLoading(false)
        }
    }

    const handleQuickQuery = (queryText) => {
        handleSend(null, queryText)
    }

    const handleClearChat = () => {
        if (window.confirm('Clear conversation history?')) {
            setMessages([
                {
                    role: 'model',
                    text: "Hi there! Let's start fresh. Ask me anything about Narasinga's portfolio, skills, or experience."
                }
            ])
        }
    }

    if (isHiddenPath) return null

    // Helper function to format simple markdown-like structures
    const formatMessageText = (text) => {
        if (!text) return ''
        const lines = text.split('\n')
        const elements = []
        let inList = false

        lines.forEach((line, i) => {
            const trimmed = line.trim()
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                if (!inList) {
                    elements.push('<ul class="chat-list">')
                    inList = true
                }
                const itemText = trimmed.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                elements.push(`<li>${itemText}</li>`)
            } else {
                if (inList) {
                    elements.push('</ul>')
                    inList = false
                }
                if (trimmed) {
                    const lineText = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    elements.push(`<p>${lineText}</p>`)
                }
            }
        })

        if (inList) {
            elements.push('</ul>')
        }

        return <div className="chat-markdown" dangerouslySetInnerHTML={{ __html: elements.join('') }} />
    }

    const quickQueries = [
        "What are his skills?",
        "Tell me about his projects.",
        "What is his educational background?"
    ]

    return (
        <div className="chatbot-wrapper">
            {/* Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`chatbot-launcher glass ${isOpen ? 'active' : ''}`}
                aria-label="Toggle Chatbot"
            >
                {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
                <span className="pulse-dot" />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window glass">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="chatbot-info">
                            <div className="chatbot-avatar-pulse">
                                <FiCpu size={18} />
                            </div>
                            <div>
                                <h4>Narasinga's AI Bot</h4>
                                <span className="chatbot-status">Gemini 2.5 Flash • Online</span>
                            </div>
                        </div>
                        <div className="chatbot-header-actions">
                            <button onClick={handleClearChat} className="chatbot-clear-btn" title="Clear Chat">
                                <FiTrash2 size={16} />
                            </button>
                            <button onClick={() => setIsOpen(false)} className="chatbot-close-btn" title="Close">
                                <FiX size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Body */}
                    <div className="chatbot-body">
                        {messages.map((m, idx) => (
                            <div key={idx} className={`chat-bubble-container ${m.role}`}>
                                <div className="chat-bubble">
                                    {formatMessageText(m.text)}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="chat-bubble-container model">
                                <div className="chat-bubble typing">
                                    <span className="dot" />
                                    <span className="dot" />
                                    <span className="dot" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Queries (visible when no messages have been sent yet besides the welcome, or as suggestions at bottom) */}
                    {messages.length === 1 && !isLoading && (
                        <div className="quick-queries">
                            {quickQueries.map((q, i) => (
                                <button key={i} onClick={() => handleQuickQuery(q)} className="quick-query-btn glass">
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Area */}
                    <form onSubmit={(e) => handleSend(e)} className="chatbot-input-area">
                        <input 
                            type="text" 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                            placeholder="Ask me something..." 
                            className="chatbot-input"
                            disabled={isLoading}
                        />
                        <button type="submit" className="chatbot-send-btn" disabled={!input.trim() || isLoading}>
                            <FiSend size={16} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}
