import * as token_repository from './token_repository';
import { RestaurantApi } from './api_restaurant';

// get user from api using token, if token is expired, redirect to login
export const getCurrentUser = async () => {
    // if there is no token, redirect to login
    const token = token_repository.getToken();
    if (!token) {
        console.log("No token found, redirecting to login.");
        window.location.href = "/";
    }
    const user = await RestaurantApi.get(`/users/me`);

    // O cualquier otra lógica que necesites
    return user;
};

export const logout = async () => {
    token_repository.removeToken();
    window.location.href = "/";
}