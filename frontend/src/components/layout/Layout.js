import React from 'react';
import AppNavbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <main className="flex-grow-1">
        {children}
      </main>
    </div>
  );
};

export default Layout; 