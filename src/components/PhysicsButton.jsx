import React from 'react';
import { motion } from 'framer-motion';
import './PhysicsButton.css';

const PhysicsButton = ({ children, onClick, className = '', type = 'button' }) => {
    return (
        <motion.button
            type={type}
            className={`physics-btn ${className}`}
            onClick={onClick}
            whileHover={{
                scale: 1.03,
                boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)" // Warm amber glow
            }}
            whileTap={{
                scale: 0.98,
                boxShadow: "0 0 5px rgba(212, 175, 55, 0.1)"
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 17
            }}
        >
            {children}
        </motion.button>
    );
};

export default PhysicsButton;
