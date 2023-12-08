const http = require('http');
const { request } = require('undici');
const httpClient = require("../httpClient");

const fetchWithTimeout = async (request, timeout = 5000) => {
    const { signal, abort } = new AbortController()
    const requestTimerId = setTimeout(() => abort, timeout ?? 3000)

    const response = await fetch(request, {
        signal,
    })

    clearTimeout(requestTimerId)

    return response
}

const buildQueryParams = (url, queryParams) => {
    if (!isEmptyObj(queryParams)) {
        for (const key in queryParams) {
            url.searchParams.set(key, queryParams[key])
        }
    }

    return url
}

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



const httpUndiciClient = async (requests) => {
    const promises = requests.map(async (option) => {
        const controller = new AbortController();
        const { signal } = controller;

        const timeout = setTimeout(() => {
            controller.abort();

            return {status: 'failed', reason: 'Request timed out', key: option.key};

        }, option.timeout);

        try {
            const {
                statusCode,
                headers,
                trailers,
                body,
            } = await request(`${option.baseURL}${option.endpoint}`, {
                method: option.method,
                headers: {
                    'Content-Type': 'application/json',
                    ...option.headers,
                },
                signal,
                // timeout: option.timeout,
            })

            clearTimeout(timeout);

            let responseData = ''
            for await (const data of body) {
                responseData += data
            }

            return {
                status: statusCode,
                value: JSON.parse(responseData.toString('utf8')),
                key: option.key,
            }
        } catch (e) {

            console.log('ERROR', e.name)
            console.log('AbortError ?', e.name === 'AbortError')

            if (e.name === 'AbortError') {
                return {status: 'failed', reason: 'Request timed out', key: option.key};
            }

            return {status: 'failed', reason: e.message, key: option.key};
        }

    });

    const results = await Promise.allSettled(promises);
    return results.reduce(buildResponse, {});
}



const buildUrl = (
    baseURL,
    endpoint,
    queryParams
) => {
    const url = new URL(endpoint, baseURL)

    if (queryParams) buildQueryParams(url, queryParams)

    return url
}

const fetchClient = async (requests) => {

    const promises = requests.map(async (options) => {
        const opts = {
            method: options.method,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        }

        if (options.data) {
            opts.body = options.data // must be JSON.stringified before calling fetchClient
        }

        const url = buildUrl(options.baseURL, options.endpoint, options.queryParams)
        // console.log('Url', url.href)
        const request = new Request(url.href, opts)

        const response = options.timeout
            ? await fetchWithTimeout(request, options.timeout)
            : await fetch(request)

        const jsonData = await response.json()

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return {
            value: jsonData,
            status: response.status,
            key: options.key,
        }
    })

    try {
        const results = await Promise.allSettled(promises);
        return results.reduce(buildResponse, {});
    } catch (error) {
        console.error(error);
    }
}

;(async () => {
    const requests = [
        {
            options: {
                host: 'jsonplaceholder.typicode.com',
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
                host: 'jsonplaceholder.typicode.com',
                path: '/todos/2',
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
                host: 'jsonplaceholder.typicode.com',
                path: '/todos/3',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            timeout: 2000,
            key: 'todo3',
        }
        // Ajoute autant de requêtes que tu le souhaites...
    ];
    console.time('httpClient')
    const results = await httpClient(requests)
    console.timeEnd('httpClient')
    console.log('[httpClient] results', results)

    // const options = [
    //     {
    //         baseURL: 'https://jsonplaceholder.typicode.com',
    //         endpoint: '/todos/1',
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         timeout: 5000,
    //         key: 'todo1',
    //     },
    //     {
    //         baseURL: 'https://jsonplaceholder.typicode.com',
    //         endpoint: '/todos/2',
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         timeout: 5000,
    //         key: 'todo2',
    //     },
    //     {
    //         baseURL: 'https://jsonplaceholder.typicode.com',
    //         endpoint: '/todos/3',
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         timeout: 5000,
    //         key: 'todo3',
    //     },
    // ]
    // console.time('fetchClient')
    // const result2 = await fetchClient(options);
    // console.timeEnd('fetchClient')
    // console.log('[fetchClient] result2', result2)

    // const undiciOptions = [
    //     {
    //         baseURL: 'https://jsonplaceholder.typicode.com',
    //         endpoint: '/todos/1',
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         timeout: 200,
    //         key: 'todo1',
    //     },
    //     {
    //         baseURL: 'https://jsonplaceholder.typicode.com',
    //         endpoint: '/todos/2',
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         timeout: 200,
    //         key: 'todo2',
    //     },
    //     {
    //         baseURL: 'https://jsonplaceholder.typicode.com',
    //         endpoint: '/todos/3',
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         timeout: 200,
    //         key: 'todo3',
    //     },
    // ]
    // console.time('httpUndiciClient')
    // const result3 = await httpUndiciClient(undiciOptions)
    // console.timeEnd('httpUndiciClient')
    // console.log('[httpUndiciClient] result3', result3)
})();