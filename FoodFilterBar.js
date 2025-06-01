import React from 'react';

const FoodsFilterBar = ({ filters, setFilters, categories }) => (
  <div style={{ marginBottom: 16 }}>
    <input
      placeholder="Filter by name"
      value={filters.name}
      onChange={e => setFilters(f => ({ ...f, name: e.target.value }))}
      style={{ marginRight: 8 }}
    />
    <select
      value={filters.category}
      onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
      style={{ marginRight: 8 }}
    >
      <option value="">All categories</option>
      {categories.map(cat => (
        <option key={cat.ID} value={cat.name}>{cat.name}</option>
      ))}
    </select>
    <select
      value={filters.badFood}
      onChange={e => setFilters(f => ({ ...f, badFood: e.target.value }))}
      style={{ marginRight: 8 }}
    >
      <option value="">All</option>
      <option value="true">Bad Food</option>
      <option value="false">Good Food</option>
    </select>
    <input
      type="date"
      value={filters.dateFrom}
      onChange={e => setFilters(f => ({ ...f, dateFrom: e.target.value }))}
      style={{ marginRight: 8 }}
      placeholder="From date"
    />
    <input
      type="date"
      value={filters.dateTo}
      onChange={e => setFilters(f => ({ ...f, dateTo: e.target.value }))}
      style={{ marginRight: 8 }}
      placeholder="To date"
    />
  </div>
);

export default FoodsFilterBar;