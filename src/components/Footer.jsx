import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container footer-inner">
                <div className="footer-left">
                    <p className="copyright">Earthy Munchy • Est. 2025 • Sri Lanka & India</p>
                    <p className="availability">Available on Blinkit • Swiggy Instamart</p>
                </div>
                <div className="footer-right">
                    <a href="#" className="social-link">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
