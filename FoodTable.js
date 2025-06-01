import React from 'react';

const FoodTable = ({ foods }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <tbody>
      {foods.length === 0 ? (
        <tr>
          <td colSpan="2" style={{ textAlign: 'center', padding: '12px', border: '1px solid #ccc' }}>
            No foods found.
          </td>
        </tr>
      ) : (
        foods.map((food) => (
          <tr key={food.ID}>
            <td style={{ border: '1px solid #bbb', padding: '8px', fontWeight: 'bold', verticalAlign: 'top', width: '120px' }}>
              {food.name}
            </td>
            <td style={{ border: '1px solid #bbb', padding: '8px' }}>
              {food.amount}g{food.note ? `, ${food.note}` : ''}, {food.category?.name || 'N/A'}, {food.receivedTime}
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);

export default FoodTable;