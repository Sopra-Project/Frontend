import React from 'react';

function Footer() {
    return (
        <footer className="text-xl p-8 text-center">
            <h2>&copy; {new Date().getFullYear()} Værste</h2>
        </footer>
    );
}

export default Footer;