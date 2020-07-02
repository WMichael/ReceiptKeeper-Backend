const API_URL = process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_API;

export const UserApi = {
    info : () => {
        return fetch(`${API_URL}/user/self`,{credentials: "include"}).then(res => res.json());
    }
}