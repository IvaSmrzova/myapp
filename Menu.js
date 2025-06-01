import React from 'react';

// Menu component: hamburger button + rollout menu
const Menu = ({ menuOpen, setMenuOpen, page, setPage }) => (
  <>
    {/* Hamburger button */}
    <button
      className="hamburger-btn"
      onClick={() => setMenuOpen(open => !open)}
      title={menuOpen ? "Close menu" : "Open menu"}
      style={{
        background: '#f9f6f1',
        border: 'none',
        borderRadius: 8,
        width: 40,
        height: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
      }}
    >
      <span style={{
        display: 'block',
        width: 24,
        height: 3,
        background: '#111',
        margin: '3px 0',
        borderRadius: 2,
        transition: '0.2s'
      }} />
      <span style={{
        display: 'block',
        width: 24,
        height: 3,
        background: '#111',
        margin: '3px 0',
        borderRadius: 2,
        transition: '0.2s'
      }} />
      <span style={{
        display: 'block',
        width: 24,
        height: 3,
        background: '#111',
        margin: '3px 0',
        borderRadius: 2,
        transition: '0.2s'
      }} />
    </button>
    {menuOpen && (
      <div
        className="rollout-menu"
        style={{
          position: 'absolute',
          marginTop: 50,
          marginLeft: 0,
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          padding: '8px 0',
          minWidth: 140,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          zIndex: 100
        }}
      >
        <button
          className="menu-link"
          onClick={() => { setPage('dashboard'); setMenuOpen(false); }}
          style={{
            padding: '10px 16px',
            background: page === 'dashboard' ? '#e0e0e0' : 'transparent',
            color: '#222',
            border: 'none',
            borderRadius: 0,
            textAlign: 'left',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >Home</button>
        <button
          className="menu-link"
          onClick={() => { setPage('foods'); setMenuOpen(false); }}
          style={{
            padding: '10px 16px',
            background: page === 'foods' ? '#e0e0e0' : 'transparent',
            color: '#222',
            border: 'none',
            borderRadius: 0,
            textAlign: 'left',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >List of Foods</button>
      </div>
    )}
  </>
);

export default Menu;