import axios from "axios";

const API = axios.create({baseURL: `${import.meta.env.VITE_API_URL}`});

// midddleware before `request`
API.interceptors.request.use(function (config) {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if(profile) {
        config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// user routes
export const signUpApi = async (formData) => API.post('/user/signup', formData);
export const signInApi = async (formData) => API.post('/user/signin', formData);

// budget routes
export const getBudgetsApi = async () => API.get('/budgets');
export const createBudgetApi = async (budget) => API.post('/budgets/create', budget);
export const updateBudgetApi = async (id, newBudget) => API.put(`/budgets/update/${id}`, newBudget);
export const deleteBudgetApi = async (id) => API.delete(`/budgets/delete/${id}`);

// Transaction routes
export const getTransactionsApi = async () => API.get('/transactions');
export const createTransactionApi = async (transaction) => API.post('/transactions/create', transaction);
export const updateTransactionApi = async (id, newTransaction) => API.put(`/transactions/update/${id}`, newTransaction);
export const deleteTransactionApi = async (id) => API.delete(`/transactions/delete/${id}`);
