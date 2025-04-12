'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaUserCircle, FaSignOutAlt, FaPlusCircle, FaChartBar, FaClock, FaLightbulb, FaQuestionCircle, FaPiggyBank } from 'react-icons/fa';
import styles from './dashboard.module.css';
import AmazingNavbar from '../AmazingNavbar/page';

// Dummy data
const userAccounts = [{ id: 1, name: 'Savings', balance: '₹15,000' }, { id: 2, name: 'Current', balance: '₹5,000' }];
const expenditureData = {};
const timeChartData = {};
const futurePlansData = [];
const dailyQuestionsData = [];

const DashboardPage = () => {
    const containerRef = useRef(null);
    const [currentSection, setCurrentSection] = useState(0);
    const [streak, setStreak] = useState(7);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [chatbotMessages, setChatbotMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Set up animation observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.animate);
                    }
                });
            },
            { threshold: 0.2 }
        );
        
        // Observe all rows
        const rows = document.querySelectorAll(`.${styles['dashboard-row']}`);
        rows.forEach(row => {
            observer.observe(row);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setChatbotMessages(prevMessages => [...prevMessages, { text: newMessage, sender: 'user' }]);
            setTimeout(() => {
                setChatbotMessages(prevMessages => [...prevMessages, { text: `Echo: ${newMessage}`, sender: 'bot' }]);
            }, 500);
            setNewMessage('');
        }
    };

    return (
        <div ref={containerRef} className={styles['dashboard-container']}>
            <AmazingNavbar onNavigate={scrollToSection} />

            {/* Accounts Row */}
            <div id="accounts" className={styles['dashboard-row']} style={{ marginTop: '60px' }}>
                <section className={styles['dashboard-section']}>
                    <h2>Your Accounts</h2>
                    <ul>
                        {userAccounts.map(acc => (
                            <li key={acc.id}>{acc.name}: {acc.balance}</li>
                        ))}
                    </ul>
                </section>
                
                <section className={styles['dashboard-section']}>
                    <h2>NLP Chatbot Agent</h2>
                    <button onClick={() => setIsChatbotOpen(!isChatbotOpen)}>
                        {isChatbotOpen ? 'Hide Chatbot' : 'Show Chatbot'}
                    </button>
                    
                    {isChatbotOpen && (
                        <div className={styles['chatbot-container']}>
                            {chatbotMessages.map((msg, index) => (
                                <div key={index} style={{ 
                                    textAlign: msg.sender === 'user' ? 'right' : 'left', 
                                    marginBottom: '0.5rem' 
                                }}>
                                    <strong>{msg.sender === 'user' ? 'You:' : 'Bot:'}</strong> {msg.text}
                                </div>
                            ))}
                            <div className={styles['chatbot-input']}>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Ask something..."
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button onClick={handleSendMessage}>Send</button>
                            </div>
                        </div>
                    )}
                </section>
            </div>

            {/* Expenditure Row */}
            <div id="expenditure" className={styles['dashboard-row']}>
                <section className={styles['dashboard-section']}>
                    <h2>Expenditure Behavior Model</h2>
                    <div>
                        <p>Insights into your spending habits will appear here.</p>
                        <p>Track your monthly expenses and see patterns in your financial behavior.</p>
                        <p>Current streak: {streak} days of tracking</p>
                    </div>
                </section>
                
                <section className={styles['dashboard-section']}>
                    <h2>Time Chart Analysis</h2>
                    <div>
                        <FaChartBar size={40} style={{ marginBottom: '1rem', color: '#0072ff' }} />
                        <p>Visual representation of your financial activity over time.</p>
                        <p>See how your spending and saving habits evolve month by month.</p>
                    </div>
                </section>
            </div>

            {/* Plans Row */}
            <div id="plans" className={styles['dashboard-row']}>
                <section className={styles['dashboard-section']}>
                    <h2>Future Plans & Goals</h2>
                    <div>
                        <FaLightbulb size={30} style={{ marginBottom: '1rem', color: '#FBBC05' }} />
                        {futurePlansData.length > 0 ? (
                            <ul>
                                {futurePlansData.map((plan, index) => (
                                    <li key={index}>{plan}</li>
                                ))}
                            </ul>
                        ) : (
                            <div>
                                <p>No future plans recorded yet.</p>
                                <p>Set goals for your savings and track your progress over time.</p>
                            </div>
                        )}
                    </div>
                </section>
                
                <section className={styles['dashboard-section']}>
                    <h2>Daily Questions & Insights</h2>
                    <div>
                        <FaQuestionCircle size={30} style={{ marginBottom: '1rem', color: '#34A853' }} />
                        {dailyQuestionsData.length > 0 ? (
                            <ul>
                                {dailyQuestionsData.map((question, index) => (
                                    <li key={index}>{question}</li>
                                ))}
                            </ul>
                        ) : (
                            <div>
                                <p>No daily insights available today.</p>
                                <p>Check back tomorrow for personalized financial questions and tips.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <button className={styles['add-expense-button']}>
                <FaPlusCircle style={{ marginRight: '5px' }} /> Add Expense
            </button>
        </div>
    );
};

export default DashboardPage;