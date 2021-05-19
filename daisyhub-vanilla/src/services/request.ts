export function request<T>(resource: string, options?: RequestInit): Promise<T> {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const headers = new Headers();

  if (options?.body) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(`${BASE_URL}/${resource}`, {
    mode: 'cors',
    headers,
    ...options,
  }).then(response => {
    const contentType = response.headers.get('content-type');
    const isJSON = contentType && contentType.includes('application/json');

    if (!response.ok && !isJSON) throw new Error(response.statusText);

    if (!isJSON) return null;

    return response.json().then(response => {
      if (response.status !== 'success') throw response.error;

      return response.data;
    });
  });
}
