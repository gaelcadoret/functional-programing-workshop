const http = require("http");

const buildResponse = (acc, result) => {

    // console.log('result ===>', result);

    if (result.status === 'rejected') {
        return {
            ...acc,
            [result.reason.key]: {
                status: result.reason.status,
                reason: result.reason.reason
            }
        }
    }

    if (result.value.status >= 200 && result.value.status < 300) {
        return {
            ...acc,
            [result.value.key]:  result.value
        }
    } else if (result.status === 'failed') {

        return {
            ...acc,
            [result.value.key]: {
                status: result.value.status,
                reason: result.reason
            }
        }
    } else {
        // console.error(`Request failed with status code ${result.status}`);
        return {
            ...acc,
            [result.value.key]: {
                status: result.value.status,
                reason: result.value.reason, //`Request failed with status code ${result.status}`
            }
        }
    }
}

const requestCallback = (request, resolve) => (response) => {
    let responseData = '';

    response.on('data', (chunk) => {
        responseData += chunk;
    });

    response.on('end', () => {
        const parsedData = JSON.parse(responseData);
        resolve({status: response.statusCode, value: parsedData, key: request.key});
    });
}

const httpClient = async (requests) => {
    const promises = requests.map((request) => {
        return new Promise((resolve, reject) => {

            const req = http.request(request.options, requestCallback(request, resolve));

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
                    reject({status: 'failed', reason: 'Request timed out', key: request.key});
                });
            }
        });
    });

    try {
        const results = await Promise.allSettled(promises);
        return results.reduce(buildResponse, {});
    } catch (error) {
        console.error(error);
    }
}

module.exports = httpClient;