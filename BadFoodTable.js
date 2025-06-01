import React from 'react';

// Import React (required for JSX in some setups)

// BadFoodTable component displays a table of bad foods
const BadFoodTable = ({ badFoods }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '8px' }}>
    <thead>
      <tr>
        <th
          colSpan={2}
          style={{
            border: '2px solid #c00',
            padding: '8px',
            background: '#f3e9d2',
            textAlign: 'center',
            fontSize: '1.1em',
            color: '#c00'
          }}
        >
          Bad Food
        </th>
      </tr>
      {/* Table header row for columns */}
      <tr>
        <th style={{ border: '1px solid #f99', padding: '8px', color: '#c00', background: '#fff5f5' }}>Name</th>
        <th style={{ border: '1px solid #f99', padding: '8px', color: '#c00', background: '#fff5f5' }}>Details</th>
      </tr>
    </thead>
    <tbody>
      {/* Show message if no bad foods */}
      {badFoods.length === 0 ? (
        <tr>
          <td colSpan="2" style={{ textAlign: 'center', padding: '12px', border: '1px solid #ccc' }}>
            No bad foods found.
          </td>
        </tr>
      ) : (
        // Map each bad food to a table row
        badFoods.map((food) => (
          <tr key={food.ID}>
            <td style={{ border: '1px solid #f99', padding: '8px', fontWeight: 'bold', verticalAlign: 'top', width: '120px', color: '#c00' }}>
              {food.name}
            </td>
            <td style={{ border: '1px solid #f99', padding: '8px', color: '#c00' }}>
              {food.amount}g{food.note ? `, ${food.note}` : ''}, {food.category?.name || 'N/A'}, {food.receivedTime}
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);

export default BadFoodTable;