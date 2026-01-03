import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaTimes } from 'react-icons/fa';
import './FullScreenMenu.css';

const FullScreenMenu = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fs-menu-overlay"
                    initial={{ opacity: 0, y: '-100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '-100%' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="container fs-menu-inner">
                        <button className="fs-close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>

                        <nav className="fs-nav">
                            <ul className="fs-nav-list">
                                <li className="fs-nav-item">
                                    <a href="#" className="fs-nav-link" onClick={onClose}>Home</a>
                                </li>
                                <li className="fs-nav-item">
                                    <a href="#" className="fs-nav-link" onClick={onClose}>Origin</a>
                                </li>
                                <li className="fs-nav-item">
                                    <a href="#" className="fs-nav-link" onClick={onClose}>Wild</a>
                                </li>
                                <li className="fs-nav-item">
                                    <a href="#" className="fs-nav-link" onClick={onClose}>Craft</a>
                                </li>
                            </ul>
                        </nav>

                        <div className="fs-socials">
                            <p className="fs-social-label">Follow Us</p>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="fs-social-icon">
                                <FaInstagram />
                                <span className="fs-social-text">DM us on Instagram</span>
                            </a>
                        </div>

                        <div className="fs-footer">
                            <p>Earthy Munchy • Est. 2025</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FullScreenMenu;
