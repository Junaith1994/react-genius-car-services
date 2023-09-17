import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <p><small>copyright &copy; {currentYear}</small></p>
        </footer>
    );
};

export default Footer;