'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUserCircle, FaSignOutAlt, FaChartLine, FaPiggyBank, FaListAlt } from 'react-icons/fa';
import AmazingNavbar from '../AmazingNavbar/page'; // Assuming the navbar is in this path

// Dummy Data (Replace with your actual data fetching)
const pastExpenses = [
    { date: '2025-04-05', amount: 50 },
    { date: '2025-04-06', amount: 120 },
    { date: '2025-04-07', amount: 30 },
    { date: '2025-04-08', amount: 80 },
    { date: '2025-04-09', amount: 65 },
    { date: '2025-04-10', amount: 90 },
    { date: '2025-04-11', amount: 45 },
    { date: '2025-04-12', amount: 150 },
];

const expenditureFluctuationData = {
    labels: pastExpenses.map(exp => exp.date),
    datasets: [
        {
            label: 'Daily Expenditure',
            data: pastExpenses.map(exp => exp.amount),
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
        },
    ],
};

const userAccounts = [
    { name: 'Savings', balance: '₹25,000' },
    { name: 'Checking', balance: '₹8,000' },
    { name: 'Credit Card', balance: '-₹2,500' },
];

const futureGoals = [
    { name: 'Down Payment for Car', target: 50000, current: 28000 },
    { name: 'Vacation Fund', target: 30000, current: 15000 },
];

const ProfilePage = () => {
    const [daysToShow, setDaysToShow] = useState(7); // Default to past 7 days

    const displayedExpenses = pastExpenses.slice(-daysToShow);

    const calculateGoalProgress = (target: number, current: number) => {
        if (target === 0) return 0;
        return Math.min(100, (current / target) * 100);
    };

    return (
        <div className="profile-container" style={{ backgroundColor: '#0a1929', minHeight: '100vh', paddingBottom: '2rem' }}>
            <AmazingNavbar onNavigate={() => { /* No internal navigation on profile page */ }} />

            <div className="profile-content" style={{ marginTop: '60px', padding: '2rem', color: '#ccd6f6' }}>
                <h1 style={{ color: '#64ffda', marginBottom: '1.5rem' }}>Your Profile</h1>

                {/* Past Expenses */}
                <section style={{ marginBottom: '2rem', backgroundColor: '#112240', padding: '1.5rem', borderRadius: '8px' }}>
                    <h2 style={{ color: '#64ffda', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaListAlt /> Past {daysToShow} Days Expenses</h2>
                    <label htmlFor="daysToShow" style={{ display: 'inline-block', marginRight: '1rem', color: '#a8b2d1' }}>Show last:</label>
                    <select id="daysToShow" value={daysToShow} onChange={(e) => setDaysToShow(parseInt(e.target.value))} style={{ padding: '0.5rem', borderRadius: '4px', backgroundColor: '#233554', color: '#ccd6f6', borderColor: '#495670' }}>
                        <option value={7}>7</option>
                        <option value={30}>30</option>
                        <option value={90}>90</option>
                    </select>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {displayedExpenses.map((expense, index) => (
                            <li key={index} style={{ padding: '0.75rem 0', borderBottom: '1px solid #233554', display: 'flex', justifyContent: 'space-between' }}>
                                <span>{expense.date}</span>
                                <span>₹{expense.amount}</span>
                            </li>
                        ))}
                        {displayedExpenses.length === 0 && <p style={{ color: '#a8b2d1' }}>No expenses recorded for the selected period.</p>}
                    </ul>
                </section>

                {/* Expenditure Fluctuation Graph */}
                <section style={{ marginBottom: '2rem', backgroundColor: '#112240', padding: '1.5rem', borderRadius: '8px' }}>
                    <h2 style={{ color: '#64ffda', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaChartLine /> Expenditure Fluctuation</h2>
                    {/* You would integrate a charting library here (e.g., Chart.js, Recharts) */}
                    <div style={{ height: '200px', border: '1px solid #233554', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#a8b2d1' }}>
                        {/* Replace this with your actual graph component */}
                        Placeholder for Expenditure Graph
                    </div>
                </section>

                {/* Your Accounts */}
                <section style={{ marginBottom: '2rem', backgroundColor: '#112240', padding: '1.5rem', borderRadius: '8px' }}>
                    <h2 style={{ color: '#64ffda', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaPiggyBank /> Your Accounts</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {userAccounts.map((account, index) => (
                            <li key={index} style={{ padding: '0.75rem 0', borderBottom: '1px solid #233554', display: 'flex', justifyContent: 'space-between' }}>
                                <span>{account.name}</span>
                                <span>{account.balance}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Future Goals */}
                <section style={{ marginBottom: '2rem', backgroundColor: '#112240', padding: '1.5rem', borderRadius: '8px' }}>
                    <h2 style={{ color: '#64ffda', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaPiggyBank /> Future Goals</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {futureGoals.map((goal, index) => (
                            <li key={index} style={{ padding: '0.75rem 0', borderBottom: '1px solid #233554' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span>{goal.name}</span>
                                    <span>{goal.current} / {goal.target}</span>
                                </div>
                                <div style={{ backgroundColor: '#233554', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                                    <div style={{
                                        backgroundColor: '#64ffda',
                                        height: '100%',
                                        width: `${calculateGoalProgress(goal.target, goal.current)}%`,
                                        borderRadius: '4px'
                                    }}></div>
                                </div>
                                <span style={{ fontSize: '0.8rem', color: '#a8b2d1', display: 'block', textAlign: 'right' }}>{calculateGoalProgress(goal.target, goal.current)}% Achieved</span>
                            </li>
                        ))}
                        {futureGoals.length === 0 && <p style={{ color: '#a8b2d1' }}>No future goals set yet.</p>}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default ProfilePage;