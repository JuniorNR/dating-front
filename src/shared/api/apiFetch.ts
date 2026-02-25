export interface ApiError {
	error: string;
	message: string;
	statusCode: number;
}

export const customApiFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
	const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

	const response = await fetch(`${baseURL}${url}`, {
		...options,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
	});

	if (!response.ok) {
		const error = (await response.json()) as ApiError;
		throw error;
	}

	const data = await response.json();

	return {
		data,
		status: response.status,
		headers: response.headers,
	} as T;
};
