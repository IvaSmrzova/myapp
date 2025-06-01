import React from 'react';
import logo from '../toddlerEat.jpg';

const DashboardHeader = ({ setPage }) => (
  <header style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
    <img
      src={logo}
      alt="ToddlerEat Logo"
      style={{ height: '100px', cursor: 'pointer' }}
      onClick={() => setPage('dashboard')}
      title="Go to Dashboard"
    />
  </header>
);

export default DashboardHeader;