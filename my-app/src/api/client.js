// קליינט כללי - המקום היחיד בפרויקט שפונה ישירות לשרת
const BASE_URL = 'http://localhost:3000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}/${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

export function get(path) {
  return request(path)
}

export function post(path, data) {
  return request(path, { method: 'POST', body: JSON.stringify(data) })
}

export function patch(path, data) {
  return request(path, { method: 'PATCH', body: JSON.stringify(data) })
}

export function remove(path) {
  return request(path, { method: 'DELETE' })
}
