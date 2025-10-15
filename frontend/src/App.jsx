import React, { useEffect, useState } from 'react';
import UniformForm from './components/UniformForm';
import { fetchCourses, createCourse } from './api';

export default function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchCourses();
      setCourses(data);
    } catch (e) {
      setError(e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ load(); }, []);

  const handleAdd = async (formData) => {
    try {
      const created = await createCourse(formData);
      // prepend
      setCourses(prev => [created, ...prev]);
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message || 'Failed' };
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 12 }}>
      <h1>Courses Manager</h1>
      <UniformForm onSubmit={handleAdd} />
      <hr />
      <h2>Existing Courses</h2>
      {loading ? <p>Loading...</p> : null}
      {error && <p style={{color:'red'}}>{error}</p>}
      {!loading && courses.length === 0 && <p>No courses found.</p>}
      <ul>
        {courses.map(c => (
          <li key={c._id} style={{marginBottom:12, border:'1px solid #ddd', padding:8, borderRadius:6}}>
            <strong>{c.title}</strong>
            <div>Name: {c.name}</div>
            <div>Email: {c.email}</div>
            <div>Phone: {c.phone}</div>
            {c.description && <div>Description: {c.description}</div>}
            <div style={{fontSize:12,color:'#666'}}>Added: {new Date(c.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
