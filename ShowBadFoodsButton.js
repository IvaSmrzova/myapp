import React from 'react';

const ShowBadFoodsButton = ({ showBadFoods, setShowBadFoods }) => (
  <button
    onClick={() => setShowBadFoods(!showBadFoods)}
    style={{
      width: 180,
      padding: '8px 16px',
      fontSize: '1em',
      background: '#f3e9d2',
      border: '1px solid #bbb',
      borderRight: 'none',
      cursor: 'pointer',
      marginBottom: '8px',
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      borderTopRightRadius: showBadFoods ? 0 : 8,
      borderBottomRightRadius: showBadFoods ? 0 : 8
    }}
  >
    {showBadFoods ? 'Hide Bad Foods' : 'Show Bad Foods'}
  </button>
);

export default ShowBadFoodsButton;