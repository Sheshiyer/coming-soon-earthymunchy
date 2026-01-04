import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container footer-inner">
                <div className="footer-left">
                    <p className="copyright">Earthy Munchy • Est. 2025 • Sri Lanka & India</p>

                </div>
                <div className="footer-right">
                    <a href="https://www.instagram.com/earthy.munchy?igsh=azAzMXR1OW1wZXRr" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                        <FaInstagram size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
