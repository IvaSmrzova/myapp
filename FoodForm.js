import React from 'react';

// FoodForm component for adding/editing food items
const FoodForm = ({ formData, categories, onChange, onSubmit, onCancel }) => (
    // Main form container
    <form
        onSubmit={onSubmit}
        style={{
            marginBottom: '24px',
            border: '1px solid #bbb',
            padding: '16px',
            borderRadius: '8px',
            background: '#fafafa'
        }}
    >
        {/* Name input */}
        <div style={{ marginBottom: '8px' }}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    required
                    maxLength={150}
                    style={{ marginLeft: '8px', width: '200px' }}
                />
            </label>
        </div>

        {/* Category select */}
        <div style={{ marginBottom: '8px' }}>
            <label>
                Category:
                <select
                    name="category"
                    value={formData.category}
                    onChange={onChange}
                    required
                    style={{ marginLeft: '8px' }}
                >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                        <option key={cat.ID} value={cat.ID}>{cat.name}</option>
                    ))}
                </select>
            </label>
        </div>

        {/* Amount input */}
        <div style={{ marginBottom: '8px' }}>
            <label>
                Amount (g):
                <input
                    type="number"
                    name="amount"
                    value={formData.amount ?? ''}
                    onChange={onChange}
                    required
                    min={1}
                    style={{ marginLeft: '8px', width: '100px' }}
                />
            </label>
        </div>

        {/* Date input */}
        <div style={{ marginBottom: '8px' }}>
            <label>
                Date:
                <input
                    type="date"
                    name="receivedTime"
                    value={formData.receivedTime ?? ''}
                    onChange={onChange}
                    required
                    style={{ marginLeft: '8px' }}
                />
            </label>
        </div>

        {/* Note input */}
        <div style={{ marginBottom: '8px' }}>
            <label>
                Note:
                <input
                    type="text"
                    name="note"
                    value={formData.note}
                    onChange={onChange}
                    maxLength={150}
                    style={{ marginLeft: '8px', width: '250px' }}
                />
            </label>
        </div>

        {/* Action buttons */}
        <div>
            <button type="submit" style={{ marginRight: '8px' }}>Add</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </div>
    </form>
);

export default FoodForm;