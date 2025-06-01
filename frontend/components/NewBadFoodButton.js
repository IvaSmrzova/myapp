import React from 'react';

const NewBadFoodButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '8px 16px',
      fontSize: '1em',
      background: '#ffeaea',
      border: '1px solid #c00',
      borderLeft: 'none',
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      color: '#c00',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginBottom: '8px'
    }}
  >
    New Bad Food
  </button>
);

export default NewBadFoodButton;