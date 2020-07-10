
const API_URL = process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_API;

export const ReceiptApi = {
    all: () => {
        return fetch(`${API_URL}/receipts`, {credentials: "include"}).then(res => res.json());
    },
    save: (body) => {
        return fetch(`${API_URL}/receipts/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: "include"
        }).then(res => res.json());
    },
    delete: (id) => {
        return fetch(`${API_URL}/receipts/${id}`, {
            method: 'DELETE',
            credentials: "include"
        }).then(res => res.json());
    },
    update: (id, body) => {
        return fetch(`${API_URL}/receipts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(body),
            credentials: "include"
        }).then(res => res.json());
    }
}
