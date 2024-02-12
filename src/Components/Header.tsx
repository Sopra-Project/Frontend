import React from 'react';
import { Link } from 'react-router-dom';

interface UsernameProps {
    username: string;
}

const Header: React.FC<UsernameProps> = ({ username }) => {

  return (
    <header className="bg-marine-blue-dark p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-3xl mx-auto">Værste gjesteparking</Link>
      <h3 className="text-white text-sm">{username}</h3>
    </header>
  );
}

export default Header;
