import React from 'react';
import FoodForm from './FoodForm';
import FoodTable from './FoodTable';

// FoodList component displays the food table and optionally the food form
const FoodList = ({
    foods,
    showForm,
    setShowForm,
    formData,
    categories,
    handleInputChange,
    handleFormSubmit,
    setFormData // Not used in this component, can be removed if unnecessary
}) => (
    <div
        style={{
            background: '#f3e9d2', // slightly darker beige
            borderRadius: 16,
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            padding: '24px',
            marginBottom: '24px',
            transition: 'box-shadow 0.2s'
        }}
    >
        {/* Header with "Food" title and "New Food" button */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: showForm ? '16px' : '0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 0 }}>
                <thead>
                    <tr>
                        <th
                            colSpan={2}
                            style={{
                                border: '2px solid #222',
                                padding: '8px',
                                background: '#f3e9d2',
                                textAlign: 'center',
                                fontSize: '1.2em',
                                position: 'relative'
                            }}
                        >
                            Food
                            <button
                                onClick={() => setShowForm(true)}
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    height: '100%',
                                    border: 'none',
                                    background: '#e0e0e0',
                                    borderLeft: '2px solid #222',
                                    padding: '0 20px',
                                    fontSize: '1em',
                                    cursor: 'pointer'
                                }}
                            >
                                New Food
                            </button>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>

        {/* Show FoodForm if showForm is true */}
        {showForm && (
            <FoodForm
                formData={formData}
                categories={categories}
                onChange={handleInputChange}
                onSubmit={handleFormSubmit}
                onCancel={() => setShowForm(false)}
            />
        )}

        {/* FoodTable always visible */}
        <FoodTable foods={foods} />
    </div>
);

export default FoodList;