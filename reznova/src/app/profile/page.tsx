'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaUserCircle, FaSignOutAlt, FaChartLine, FaPiggyBank, FaListAlt } from 'react-icons/fa';
import AmazingNavbar from '../AmazingNavbar/page';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Expense {
    date: string;
    amount: number;
    name: string;
}

const ProfilePage = () => {
    const [pastExpenses, setPastExpenses] = useState<Expense[]>([
        { date: '2025-04-05', amount: 50, name: 'Groceries' },
        { date: '2025-04-06', amount: 120, name: 'Dining Out' },
        { date: '2025-04-07', amount: 30, name: 'Coffee' },
    ]);
    const [daysToShow, setDaysToShow] = useState(7);
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [chartData, setChartData] = useState({
        labels: pastExpenses.map(exp => exp.date),
        datasets: [
            {
                label: 'Daily Expenditure',
                data: pastExpenses.map(exp => exp.amount),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
        ],
    });
    const chartSectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        updateChartData();
    }, [pastExpenses]);

    const updateChartData = () => {
        setChartData({
            labels: pastExpenses.map(exp => exp.date),
            datasets: [
                {
                    label: 'Daily Expenditure',
                    data: pastExpenses.map(exp => exp.amount),
                    borderColor: 'rgba(75,192,192,1)',
                    fill: false,
                },
            ],
        });
    };

    useEffect(() => {
        setDisplayedExpenses(pastExpenses.slice(-daysToShow));
    }, [daysToShow, pastExpenses]);

    const [displayedExpenses, setDisplayedExpenses] = useState<Expense[]>(pastExpenses.slice(-daysToShow));

    const handleExpenseSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newExpense = {
            date: expenseDate,
            amount: parseFloat(expenseAmount),
            name: expenseName,
        };
        setPastExpenses([...pastExpenses, newExpense]);
        setExpenseName('');
        setExpenseAmount('');
        setExpenseDate('');

        // Scroll to the chart section
        chartSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const calculateGoalProgress = (target: number, current: number) => {
        if (target === 0) return 0;
        return Math.min(100, (current / target) * 100);
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

    return (
        <div className="profile-container" style={{ backgroundColor: '#0a1929', minHeight: '100vh', paddingBottom: '2rem' }}>
            <AmazingNavbar onNavigate={() => { /* No internal navigation on profile page */ }} />

            <div className="profile-content" style={{ marginTop: '60px', padding: '2rem', color: '#ccd6f6' }}>
                <h1 style={{ color: '#64ffda', marginBottom: '1.5rem' }}>Your Profile</h1>

                {/* Add Expense Form */}
                <section style={{ marginBottom: '2rem', backgroundColor: '#112240', padding: '1.5rem', borderRadius: '8px' }}>
                    <h2 style={{ color: '#64ffda', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Add New Expense</h2>
                    <form onSubmit={handleExpenseSubmit} style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label htmlFor="expenseName" style={{ display: 'block', marginBottom: '0.5rem', color: '#a8b2d1' }}>Expense Name:</label>
                            <input
                                type="text"
                                id="expenseName"
                                value={expenseName}
                                onChange={(e) => setExpenseName(e.target.value)}
                                required
                                style={{ padding: '0.75rem', borderRadius: '4px', backgroundColor: '#233554', color: '#ccd6f6', borderColor: '#495670', width: '100%' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="expenseAmount" style={{ display: 'block', marginBottom: '0.5rem', color: '#a8b2d1' }}>Amount:</label>
                            <input
                                type="number"
                                id="expenseAmount"
                                value={expenseAmount}
                                onChange={(e) => setExpenseAmount(e.target.value)}
                                required
                                style={{ padding: '0.75rem', borderRadius: '4px', backgroundColor: '#233554', color: '#ccd6f6', borderColor: '#495670', width: '100%' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="expenseDate" style={{ display: 'block', marginBottom: '0.5rem', color: '#a8b2d1' }}>Date:</label>
                            <input
                                type="date"
                                id="expenseDate"
                                value={expenseDate}
                                onChange={(e) => setExpenseDate(e.target.value)}
                                required
                                style={{ padding: '0.75rem', borderRadius: '4px', backgroundColor: '#233554', color: '#ccd6f6', borderColor: '#495670', width: '100%' }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '4px',
                                backgroundColor: '#64ffda',
                                color: '#0a1929',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1rem',
                            }}
                        >
                            Add Expense
                        </button>
                    </form>
                </section>

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
                                <span>{expense.name}</span>
                            </li>
                        ))}
                        {displayedExpenses.length === 0 && <p style={{ color: '#a8b2d1' }}>No expenses recorded for the selected period.</p>}
                    </ul>
                </section>

                {/* Expenditure Fluctuation Graph */}
                <section ref={chartSectionRef} style={{ marginBottom: '2rem', backgroundColor: '#112240', padding: '1.5rem', borderRadius: '8px' }}>
                    <h2 style={{ color: '#64ffda', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaChartLine /> Expenditure Fluctuation</h2>
                    <div style={{ height: '300px' }}>
                        <Line data={chartData} />
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
