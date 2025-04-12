'use client';

import React, { useState, useEffect } from 'react'; // Import useEffect
import Link from 'next/link';
import { FaUserCircle, FaSignOutAlt, FaHome, FaWallet, FaChartPie, FaCog, FaBars } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const AmazingNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        setActiveLink(router.pathname);
    }, [router.pathname]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavLinkClick = (path: string) => {
        router.push(path);
        setActiveLink(path);
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`dashboard-navbar amazing-navbar ${isMobileMenuOpen ? 'mobile-open' : ''}`}
             style={{
                 display: 'flex',
                 justifyContent: 'space-between',
                 alignItems: 'center',
                 padding: '1rem 2rem',
                 backgroundColor: '#0d1a26', /* Darker background */
                 color: '#e6f1ff', /* Lighter text */
                 position: 'fixed',
                 top: 0,
                 left: 0,
                 right: 0,
                 zIndex: 20,
                 boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' /* More pronounced shadow */
             }}>
            <div className="navbar-brand" style={{ /* No specific layout needed */ }}>
                <Link href="/dashboard" className="logo" style={{ fontSize: '1.8rem', fontWeight: 600, color: '#64b5f6', textDecoration: 'none' }}>
                    RezNova <span className="logo-accent" style={{ color: '#a5d0ff', fontWeight: 400 }}>AI</span>
                </Link>
            </div>

            <div className="navbar-toggle" onClick={toggleMobileMenu} style={{ display: 'none', fontSize: '1.75rem', color: '#8892b0', cursor: 'pointer' }}>
                <FaBars />
            </div>

            <div className="navbar-links" style={{ display: 'flex', alignItems: 'center' }}>
                <ul className="nav-items" style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '2rem' }}>
                    <li className="nav-item" style={{}}>
                        <button onClick={() => handleNavLinkClick('/dashboard')} className={`nav-link ${activeLink === '/dashboard' ? 'active' : ''}`} style={{ color: '#ccd6f6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'color 0.3s ease-in-out', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0' }}>
                            <FaHome className="nav-icon" style={{ fontSize: '1.2rem' }} /> Dashboard
                        </button>
                    </li>
                    <li className="nav-item" style={{}}>
                        <button onClick={() => handleNavLinkClick('/accounts')} className={`nav-link ${activeLink === '/accounts' ? 'active' : ''}`} style={{ color: '#ccd6f6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'color 0.3s ease-in-out', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0' }}>
                            <FaWallet className="nav-icon" style={{ fontSize: '1.2rem' }} /> Accounts
                        </button>
                    </li>
                    <li className="nav-item" style={{}}>
                        <button onClick={() => handleNavLinkClick('/reports')} className={`nav-link ${activeLink === '/reports' ? 'active' : ''}`} style={{ color: '#ccd6f6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'color 0.3s ease-in-out', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0' }}>
                            <FaChartPie className="nav-icon" style={{ fontSize: '1.2rem' }} /> Reports
                        </button>
                    </li>
                    <li className="nav-item" style={{}}>
                        <button onClick={() => handleNavLinkClick('/settings')} className={`nav-link ${activeLink === '/settings' ? 'active' : ''}`} style={{ color: '#ccd6f6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'color 0.3s ease-in-out', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0' }}>
                            <FaCog className="nav-icon" style={{ fontSize: '1.2rem' }} /> Settings
                        </button>
                    </li>
                </ul>
            </div>

            <div className="navbar-user" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Link href="/profile" className={`nav-link user-link ${activeLink === '/profile' ? 'active' : ''}`} style={{ color: '#ccd6f6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'color 0.3s ease-in-out' }}>
                    <FaUserCircle className="nav-icon user-icon" style={{ fontSize: '1.4rem' }} /> Profile
                </Link>
                <Link href="/signin" className="nav-link signout-link" style={{ color: '#ccd6f6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'color 0.3s ease-in-out' }}>
                    <FaSignOutAlt className="nav-icon signout-icon" style={{ fontSize: '1.4rem' }} /> Sign Out
                </Link>
            </div>

            {/* Mobile Styles (Inline) */}
            <style jsx>{`
              .amazing-navbar {
                /* Inherit base styles from the main style block */
              }
              .navbar-toggle {
                display: none;
              }
              .navbar-links {
                display: flex;
                align-items: center;
              }
              .nav-items {
                display: flex;
                list-style: none;
                margin: 0;
                padding: 0;
                gap: 2rem;
              }
              .nav-link {
                color: #ccd6f6;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                transition: color 0.3s ease-in-out;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem 0;
                position: relative; /* For the active line */
              }
              .nav-link:hover {
                color: #a8b2d1;
              }
              .nav-link.active::after {
                content: '';
                position: absolute;
                bottom: -5px; /* Adjust position as needed */
                left: 0;
                width: 100%;
                height: 1px;
                background-color: #64b5f6; /* Blue active line */
              }
              .nav-icon {
                font-size: 1.2rem;
              }
              .navbar-user {
                display: flex;
                align-items: center;
                gap: 1.5rem;
              }
              .user-link {
                /* Inherit nav-link styles */
              }
              .signout-link {
                /* Inherit nav-link styles */
              }
              .user-icon {
                font-size: 1.4rem;
              }
              .signout-icon {
                font-size: 1.4rem;
              }

              @media (max-width: 768px) {
                .amazing-navbar {
                  flex-direction: row;
                  justify-content: space-between;
                }
                .navbar-toggle {
                  display: block;
                }
                .navbar-links {
                  position: absolute;
                  top: 100%;
                  left: 0;
                  right: 0;
                  background-color: #0d1a26;
                  overflow: hidden;
                  max-height: 0;
                  transition: max-height 0.3s ease-in-out;
                  flex-direction: column;
                  align-items: flex-start;
                }
                .navbar-links.mobile-open {
                  max-height: 300px;
                }
                .navbar-links .nav-items {
                  flex-direction: column;
                  padding: 1rem 2rem;
                  width: 100%;
                }
                .navbar-links .nav-item {
                  margin-bottom: 1rem;
                  width: 100%;
                }
                .nav-link {
                  width: 100%;
                  padding: 0.75rem 0;
                }
                .nav-link.active::after {
                  bottom: -2px; /* Adjust for mobile */
                }
                .navbar-user {
                  display: none;
                  flex-direction: column;
                  align-items: flex-start;
                  padding: 1rem 2rem;
                }
                .navbar-user.mobile-open {
                  display: flex;
                }
              }
            `}</style>
        </nav>
    );
};

export default AmazingNavbar;