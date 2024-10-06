// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/customers';

export const getCustomers = () => axios.get(API_URL);
export const getCustomerById = (id) => axios.get(`${API_URL}/${id}`);
export const createCustomer = (customer) => axios.post(API_URL, customer);
export const updateCustomer = (id, customer) => axios.put(`${API_URL}/${id}`, customer);
export const deleteCustomer = (id) => axios.delete(`${API_URL}/${id}`);
