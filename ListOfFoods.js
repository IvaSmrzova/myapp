import React, { useState } from 'react';
import Menu from './Menu';
import logo from '../toddlerEat.jpg';
import FoodsFilterBar from './FoodFilterBar';

const ListOfFoods = ({ foods, menuOpen, setMenuOpen, page, setPage, fetchFoods, categories }) => {
  const [editingFood, setEditingFood] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', amount: '', note: '', receivedTime: '', category: '' });

  // Start editing
// Handle clicking "Edit" on a food row
const handleEdit = (food) => {
    // Set the food being edited
    setEditingFood(food);
    // Populate the edit form with the selected food's data
    setEditForm({
        name: food.name,
        amount: food.amount,
        note: food.note,
        receivedTime: food.receivedTime,
        category: food.category || null,
        badFood: typeof food.badFood === 'boolean' ? food.badFood : false
    });
};
const [filters, setFilters] = useState({
  name: '',
  category: '',
  badFood: '',
  dateFrom: '',
  dateTo: ''
});

  // Save changes
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/foods/${editingFood.ID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editingFood, ...editForm, amount: Number(editForm.amount) })
    });
    setEditingFood(null);
    setEditForm({ name: '', amount: '', note: '', receivedTime: '', category: '' });
    fetchFoods();
  };

  // Delete food
  const handleDelete = async (food) => {
    if (window.confirm(`Delete "${food.name}"?`)) {
      await fetch(`http://localhost:3000/foods/${food.ID}`, { method: 'DELETE' });
      fetchFoods(); // refresh foods without reloading the page
    }
  };


return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9f6f1' }}>
        {/* Menu column */}
        <div style={{ marginRight: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: 0, position: 'relative' }}>
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} page={page} setPage={setPage} />
        </div>
        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <header style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <img
                    src={logo}
                    alt="ToddlerEat Logo"
                    style={{ height: '100px', cursor: 'pointer' }}
                    onClick={() => setPage('dashboard')}
                    title="Go to Dashboard"
                />
            </header>
            <div style={{ padding: '40px' }}>
                <h2>All Foods</h2>
                {/* Filter bar for searching and filtering foods */}
                <FoodsFilterBar filters={filters} setFilters={setFilters} categories={categories} />
                {/* Foods table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fffbe9', borderRadius: 8 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Note</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Bad Food</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Sort foods alphabetically by name before filtering and mapping */}
                        {foods
                            .slice() // copy array to avoid mutating original
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .filter(food => {
                                // Parse dates for filtering
                                const foodDate = food.receivedTime
                                    ? new Date(food.receivedTime.split('.').reverse().join('-'))
                                    : null;
                                const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
                                const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

                                // Apply all filters
                                return (
                                    (!filters.name || food.name.toLowerCase().includes(filters.name.toLowerCase())) &&
                                    (!filters.category || food.category?.name === filters.category) &&
                                    (!filters.badFood ||
                                        (filters.badFood === 'true' && food.badFood) ||
                                        (filters.badFood === 'false' && !food.badFood)) &&
                                    (!fromDate || (foodDate && foodDate >= fromDate)) &&
                                    (!toDate || (foodDate && foodDate <= toDate))
                                );
                            })
                            .map(food =>
                                // If editing this food, show edit form row
                                editingFood && editingFood.ID === food.ID ? (
                                    <tr key={food.ID}>
                                        <td>
                                            <input value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />
                                        </td>
                                        <td>
                                            <input value={editForm.amount} onChange={e => setEditForm(f => ({ ...f, amount: e.target.value }))} />
                                        </td>
                                        <td>
                                            <input value={editForm.note} onChange={e => setEditForm(f => ({ ...f, note: e.target.value }))} />
                                        </td>
                                        <td>
                                            <input value={editForm.receivedTime} onChange={e => setEditForm(f => ({ ...f, receivedTime: e.target.value }))} />
                                        </td>
                                        <td>
                                            <select
                                                value={editForm.category ? editForm.category.ID : ''}
                                                onChange={e => {
                                                    const selectedCat = categories.find(cat => cat.ID === Number(e.target.value));
                                                    setEditForm(f => ({ ...f, category: selectedCat || null }));
                                                }}
                                            >
                                                <option value="">Select category</option>
                                                {categories.map(cat => (
                                                    <option key={cat.ID} value={cat.ID}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={editForm.badFood ? 'true' : 'false'}
                                                onChange={e => setEditForm(f => ({ ...f, badFood: e.target.value === 'true' }))}
                                            >
                                                <option value="false">No</option>
                                                <option value="true">Yes</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button onClick={handleEditSubmit}>Save</button>
                                            <button onClick={() => setEditingFood(null)}>Cancel</button>
                                        </td>
                                    </tr>
                                ) : (
                                    // Normal row for food
                                    <tr key={food.ID}>
                                        <td>{food.name}</td>
                                        <td>{food.amount}</td>
                                        <td>{food.note}</td>
                                        <td>{food.receivedTime}</td>
                                        <td>{food.category?.name || ''}</td>
                                        <td>{food.badFood ? 'Yes' : 'No'}</td>
                                        <td>
                                            <button onClick={() => handleEdit(food)}>Edit</button>
                                            <button onClick={() => handleDelete(food)} style={{ color: 'red' }}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
}
export default ListOfFoods;