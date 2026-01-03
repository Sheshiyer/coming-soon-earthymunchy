import React, { useState } from 'react';
import FullScreenMenu from './FullScreenMenu';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="site-header">
                <div className="container header-inner">
                    <div className="logo-wrapper">
                        {/* Using the requested black logo. 
                Applying a filter in CSS to make it visible on dark hero if needed, 
                or maybe the design assumes a light section. 
                For 'Mist Origin' (Dark), I'll invert it in CSS if it's pure black. */}
                        <img src="/assets/logo-black-png.png" alt="Earthy Munchy" className="brand-logo" />
                    </div>
                    <button
                        className="menu-btn"
                        aria-label="Menu"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        Menu
                    </button>
                </div>
            </header>
            <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Header;
