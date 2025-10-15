import React, { useState } from 'react';

/**
 * UniformForm - reusable form component with name, email, phone inputs.
 * Props:
 *  - onSubmit(formData) : async function that handles submission; should return {success:bool, message?:string}
 */
export default function UniformForm({ onSubmit }) {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState(null);

  const reset = () => {
    setName(''); setEmail(''); setPhone(''); setTitle(''); setDescription('');
  };

  const handle = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const payload = { name, email, phone, title, description };
      const res = await onSubmit(payload);
      if (res && res.success) {
        setMessage({ type: 'success', text: 'Course added.'});
        reset();
      } else {
        setMessage({ type: 'error', text: res.message || 'Failed to add' });
      }
    } catch (err) {
      setMessage({ type:'error', text: err.message || 'Error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handle} style={{display:'grid', gap:8, gridTemplateColumns:'1fr 1fr', alignItems:'start'}}>
      <input required placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input required placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input required placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
      <input required placeholder="Course Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea placeholder="Description (optional)" style={{gridColumn:'1 / -1'}} value={description} onChange={e=>setDescription(e.target.value)} />
      <div style={{gridColumn:'1 / -1', display:'flex', gap:8, alignItems:'center'}}>
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Course'}</button>
        <button type="button" onClick={reset}>Reset</button>
        {message && <span style={{ color: message.type === 'success' ? 'green' : 'red' }}>{message.text}</span>}
      </div>
    </form>
  );
}
