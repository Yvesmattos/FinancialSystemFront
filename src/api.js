import axios from "axios";

// const API_URL = 'https://financialsystem.herokuapp.com';
const API_URL = 'http://localhost:8080';

export function fetchDespesas() {
    return axios(`${API_URL}/despesas`)
}

export function fetchReceitas() {
    return axios(`${API_URL}/receitas`)
}

export function deleteReceita(id){
    return axios.delete(`${API_URL}/receitas/${id}`)
}

export function deleteDespesa(id){
    return axios.delete(`${API_URL}/despesas/${id}`)
}

export function updateReceita(id, receita){
    return axios.put(`${API_URL}/receitas/${id}`, receita)
}

export function updateDespesa(id, despesa){
    return axios.put(`${API_URL}/despesas/${id}`, despesa)
}

export function insertReceita(receita){
    return axios.post(`${API_URL}/receitas`, receita)
}

export function insertDespesa(despesa){
    return axios.post(`${API_URL}/despesas`, despesa)
}