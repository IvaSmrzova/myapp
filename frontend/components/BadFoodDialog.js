import React from 'react';

// BadFoodDialog component displays a dialog to mark a food as "bad"
const BadFoodDialog = ({
  foods,             // Array of food objects
  selectedFoodId,    // Currently selected food ID
  setSelectedFoodId, // Function to update selected food ID
  onClose,           // Function to close the dialog
  onMarkBad          // Function to handle marking food as bad
}) => (
  <div
    style={{
      position: 'absolute',
      top: 48,
      right: 0,
      background: '#fff',
      border: '1px solid #bbb',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      padding: 16,
      zIndex: 200,
      minWidth: 220
    }}
  >
    <form onSubmit={onMarkBad}>
      {/* Dropdown to select a food item */}
      <label>
        Select food:
        <select
          value={selectedFoodId}
          onChange={e => setSelectedFoodId(e.target.value)}
          style={{ marginLeft: 8, width: '140px' }}
          required
        >
          <option value="">Choose...</option>
          {/* Only show foods that are not already marked as bad */}
          {foods
            .filter(f => !f.badFood)
            .map(f => (
              <option key={f.ID} value={f.ID}>
                {f.name}
              </option>
            ))}
        </select>
      </label>
      {/* Action buttons */}
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <button type="submit" style={{ marginRight: 8 }}>
          Mark as Bad
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  </div>
);

export default BadFoodDialog;