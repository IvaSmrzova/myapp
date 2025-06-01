import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your backend URL

export const getAllFoods = (filters) => {
    return axios.get(`${API_BASE_URL}/foods`, { params: filters });
};

export const saveFood = (food) => {
    return axios.post(`${API_BASE_URL}/create`, food);
};

export const updateFood = (id, updatedAttributes) => {
    return axios.put(`${API_BASE_URL}/foods/${id}`, updatedAttributes);
};

export const deleteFood = (id) => {
    return axios.delete(`${API_BASE_URL}/foods/${id}`);
};
