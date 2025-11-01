// Example API service
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com'

export const api = {
  get: (endpoint) => fetch(`${API_BASE_URL}${endpoint}`).then(res => res.json()),
  post: (endpoint, data) => fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  // Add more methods as needed
}