export interface ApiError extends Error {
  status: number;
}

export const customInstance = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = new Error(`Request failed: ${response.status}`);
    (error as ApiError).status = response.status;
    throw error;
  }

  return response.json() as T;
};
