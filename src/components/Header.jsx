import React from 'react';

import './Header.css';

const Header = () => {
    return (
        <header className="site-header">
            <div className="container header-inner">
                <div className="logo-wrapper">
                    {/* Using the requested black logo. 
                Applying a filter in CSS to make it visible on dark hero if needed, 
                or maybe the design assumes a light section. 
                For 'Mist Origin' (Dark), I'll invert it in CSS if it's pure black. */}
                    <h1 className="brand-logo-text">
                        <span className="logo-earthy">EARTHY</span> <span className="logo-munchy">MUNCHY</span>
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
