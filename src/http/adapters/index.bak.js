const fetch = require('node-fetch');

function createFetchHttpAdapter(baseUrl, defaultHeaders = {}) {
    async function request(url, method = 'GET', headers = {}, body = null) {
        const urlObject = new URL(url, baseUrl);
        const requestOptions = {
            method,
            headers: { ...defaultHeaders, ...headers },
            body: body ? JSON.stringify(body) : undefined,
        };

        try {
            const response = await fetch(urlObject, requestOptions);
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }

            return responseData;
        } catch (error) {
            console.error('An error occurred:', error.message);
            throw error;
        }
    }

    async function get(url, headers = {}) {
        return request(url, 'GET', headers);
    }

    async function post(url, data = {}, headers = {}) {
        return request(url, 'POST', headers, data);
    }

    async function put(url, data = {}, headers = {}) {
        return request(url, 'PUT', headers, data);
    }

    async function del(url, headers = {}) {
        return request(url, 'DELETE', headers);
    }

    async function parallel(requests) {
        const promises = requests.map(({ method, url, headers, data }) =>
            request(url, method, headers, data)
        );

        return Promise.all(promises);
    }

    return {
        get,
        post,
        put,
        delete: del,
        parallel,
    };
}

// Exemple d'utilisation avec des requêtes en parallèle
const baseUrl = 'https://jsonplaceholder.typicode.com';
const defaultHeaders = {
    'Content-Type': 'application/json',
    // Ajoutez d'autres headers par défaut si nécessaire
};

const http = createFetchHttpAdapter(baseUrl, defaultHeaders);

(async () => {
    try {
        const requests = [
            { method: 'GET', url: '/todos/1' },
            { method: 'GET', url: '/todos/2' },
            { method: 'GET', url: '/todos/3' },
        ];

        const responses = await http.parallel(requests);
        console.log('Parallel responses:', responses);
    } catch (error) {
        console.error('Request error:', error.message);
    }
})();
