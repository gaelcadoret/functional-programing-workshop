import { logger } from '~/lib/logger'
import { omit } from '~/domain/core/utils'

import { fetchWithTimeout, buildQueryParams } from './utils'

export interface ParallelRequest {
	method: string
	url: string
	data?: RequestInit['body']
	headers?: RequestInit['headers']
	queryParams?: Record<string, unknown>
	timeout?: number
}

export interface HttpAdapter<T> {
	get: (
		endpoint: string,
		queryParams?: Record<string, unknown>,
		headers?: RequestInit['headers']
	) => Promise<T>
	post: (
		endpoint: string,
		data: RequestInit['body'],
		headers?: RequestInit['headers']
	) => Promise<T>
	put: (
		endpoint: string,
		data: RequestInit['body'],
		headers?: RequestInit['headers']
	) => Promise<T>
	delete: (endpoint: string, headers?: RequestInit['headers']) => Promise<T>
	parallel: (requests: ParallelRequest[]) => Promise<PromiseSettledResult<T>[]>
}

const optionsWithoutBody = (opts) => omit(opts, ['body'])

const buildUrl = (
	baseURL: string,
	endpoint: string,
	queryParams: Record<string, unknown> | undefined
) => {
	const url = new URL(endpoint, baseURL)

	if (queryParams) buildQueryParams(url, queryParams)

	return url
}

export const createHttpAdapter = <T>(baseURL: string): HttpAdapter<T> => {
	const makeRequest = async (
		method: RequestInit['method'],
		endpoint: string,
		data?: RequestInit['body'],
		headers?: RequestInit['headers'],
		queryParams?: Record<string, unknown>,
		timeout?: number
	) => {
		const options: RequestInit = {
			method,
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
		}

		if (data) {
			options.body = data
		}

		logger.info(optionsWithoutBody(options), endpoint)

		const url = buildUrl(baseURL, endpoint, queryParams)
		logger.info(url.href, 'Url')
		const request = new Request(url.href, options)

		const response = timeout
			? await fetchWithTimeout(request, timeout)
			: await fetch(request)

		const jsonData = await response.json()

		logger.debug(jsonData, 'fetch response')

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return {
			...jsonData,
			status: response.status,
		}
	}

	const get = async (
		endpoint: string,
		queryParams?: Record<string, unknown>,
		headers?: RequestInit['headers'],
		timeout?: number
	) => makeRequest('GET', endpoint, null, headers, queryParams, timeout)

	const post = async (
		endpoint: string,
		data: RequestInit['body'],
		headers?: RequestInit['headers'],
		timeout?: number
	) => makeRequest('POST', endpoint, data, headers, undefined, timeout)

	const put = async (
		endpoint: string,
		data: RequestInit['body'],
		headers?: RequestInit['headers'],
		timeout?: number
	) => makeRequest('PUT', endpoint, data, headers, undefined, timeout)

	const del = async (endpoint: string) => makeRequest('DELETE', endpoint)

	const parallel = async (requests: ParallelRequest[]) => {
		const promises = requests.map((request) =>
			makeRequest(
				request.method.toUpperCase(),
				request.url,
				request.data,
				request.headers,
				request.queryParams,
				request.timeout
			)
		)
		return Promise.allSettled(promises)
	}

	return {
		get,
		post,
		put,
		delete: del,
		parallel,
	}
}

export default createHttpAdapter
