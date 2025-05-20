import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="content">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
