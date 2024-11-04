import { meetpointApi } from '../../../config/api';

export const loginAsync = async (form) => {
    try {
        const { data } = await meetpointApi.post('/auth/login', form);

        return data;
    } catch (error) {
        console.error({...error});
        return error?.response?.data;
    }
}