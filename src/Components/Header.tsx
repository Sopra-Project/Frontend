import React from "react";
import {Link} from 'react-router-dom';

export default function Header() {
    return(
        <header className="bg-marine-blue-dark p-4 flex justify-between items-center">
            <Link to="/" className="text-white text-3xl mx-auto">Værste gjesteparking</Link>
            <h3 className="text-white text-sm">brukernavn</h3>
        </header>
    )

}