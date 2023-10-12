const http = require('http');

const httpClient = async (requests) => {
    const promises = requests.map((request) => {
        return new Promise((resolve) => {
            const req = http.request(request.options, (response) => {
                let responseData = '';

                response.on('data', (chunk) => {
                    responseData += chunk;
                });

                response.on('end', () => {
                    const parsedData = JSON.parse(responseData);
                    resolve({status: response.statusCode, value: parsedData, key: request.key});
                });
            });

            req.on('error', (error) => {
                resolve({status: 'failed', reason: error, key: request.key});
            });

            if (request.body) {
                req.write(JSON.stringify(request.body));
            }

            req.end();

            if (request.timeout) {
                req.setTimeout(request.timeout, () => {
                    req.destroy();
                    reject(new Error('Request timed out'));
                });
            }
        });
    });

    const results = await Promise.allSettled(promises);

    return results.reduce((acc, result) => {

        if (result.value.status >= 200 && result.value.status < 300) {
            return {
                ...acc,
                [result.value.key]:  result.value
            }
        } else if (result.status === 'failed') {
            console.error(result.reason);
            return {
                ...acc,
                [result.value.key]: {
                    status: result.value.status,
                    reason: result.reason
                }
            }

        } else {
            console.error(`Request failed with status code ${result.status}`);
            return {
                ...acc,
                [result.value.key]: {
                    status: result.value.status,
                    reason: `Request failed with status code ${result.status}`
                }
            }
        }
    }, {});
}



;(async () => {
    // Exemple d'utilisation de l'httpClient avec la logique de result.status
    const requests = [
        {
            options: {
                hostname: 'jsonplaceholder.typicode.com',
                path: '/todos/1',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            timeout: 5000,
            key: 'todo1',
        },
        {
            options: {
                hostname: 'jsonplaceholder.typicode.com',
                path: '/todos/test',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            timeout: 3000,
            key: 'todo2',
        },
        {
            options: {
                hostname: 'jsonplaceholder.typicode.com',
                path: '/todos/3',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            timeout: 200,
            key: 'todo3',
        }
        // Ajoute autant de requêtes que tu le souhaites...
    ];

    const results = await httpClient(requests)

    console.log('results', results)
})();