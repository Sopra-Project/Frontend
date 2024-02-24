import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Header = () => {

    const {user} = useAuthContext()

  return (
    <header className="bg-marine-blue-dark p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-3xl mx-auto">{user?.building}</Link>
      <h3 className="text-white text-sm">{user?.name}</h3>
    </header>
  );
}

export default Header;
