const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export async function fetchCourses() {
  const res = await fetch(`${API_BASE}/api/courses`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function createCourse(payload) {
  const res = await fetch(`${API_BASE}/api/courses`, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Failed to create');
  return data;
}
