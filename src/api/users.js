import api from './apiConfig'

export async function getUserDetails() {
    const response = await api.get('/auth/userDetails');
    return response.data;
}

const userDetails = await getUserDetails();
const username = userDetails.username;