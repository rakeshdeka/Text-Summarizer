import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link className="text-xl font-bold" to="/">AI Text Summarizer</Link>
                    <div className="flex space-x-4">
                        <Link className="hover:text-gray-300 transition-colors" to="/">Home</Link>
                        <Link className="hover:text-gray-300 transition-colors" to="/history">History</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 