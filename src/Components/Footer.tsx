import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-200 p-6 text-center">
            <div>&copy; {new Date().getFullYear()} Værste</div>
        </footer>
    );
}

export default Footer;