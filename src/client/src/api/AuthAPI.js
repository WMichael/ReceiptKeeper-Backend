const API_URL = process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_API;


// TODO: Catch errors
export const AuthAPI = {
    loggedIn: () => {
        return fetch(`${API_URL}/auth`, {credentials: "include"}).then(res => {
            if(res.status === 200) {
                return true;
            } else {
                return false;
            }
        }).catch(() => {
            return false;
        })
    }
}