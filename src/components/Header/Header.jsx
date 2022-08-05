import React from 'react';
import starWarsLogo from '../../images/star-wars-logo.png';
// import './header.css';

export default function Header() {
  return (
    <header className="bg-transparent">
      <div className="absolute left-0 top-3 pl-4">
        <img
          src={ starWarsLogo }
          alt="Black Star Wars logo with a yellow border"
          width="100px"
        />
      </div>
      <h1
        className="header-title pb-3 text-center font-starwars
      text-6xl tracking-widest text-slate-300"
      >
        Planet info
      </h1>
    </header>
  );
}
