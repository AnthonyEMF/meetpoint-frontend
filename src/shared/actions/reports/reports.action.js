import { meetpointApi } from '../../../config/api';

// Obtener todos
export const getReportsList = async (searchTerm = "", page = 1) => {
    try {
        const {data} = await meetpointApi.get(`/reports?searchTerm=${searchTerm}&page=${page}`);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Obtener por Id
export const getReportById = async (id) => {
    try {
        const {data} = await meetpointApi.get(`/reports/${id}`);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Crear
export const createReportApi = async (reportData) => {
    try {
        const {data} = await meetpointApi.post(`/reports`, reportData);
        return data;
    } catch(error) {
        console.error(error);
        return error.response;
    }
}

// Editar 
export const editReportApi = async (id, reportData) => {
    try {
        const {data} = await meetpointApi.put(`/reports/${id}`, reportData);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

// Eliminar
export const deletereportApi = async (id) => {
    try {
        const {data} = await meetpointApi.delete(`/reports/${id}`);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}