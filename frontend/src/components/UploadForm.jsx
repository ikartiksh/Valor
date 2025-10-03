import { useState } from 'react';
import api from '../services/api';
import SummaryCard from './SummaryCard.jsx';

function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [type, setType] = useState('code');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setError('Please select a file');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    try {
      const res = await api.post('/content/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
      onUpload({ ...res.data, type }); // Update history
      setError('');
    } catch (err) {
      setError('Upload failed');
    }
  };

  return (
    <form onSubmit={handleUpload} className="bg-white p-6 rounded shadow-md">
      <select value={type} onChange={(e) => setType(e.target.value)} className="mb-4 p-2 border w-full">
        <option value="code">Code</option>
        <option value="lyrics">Music Lyrics</option>
        <option value="algorithm">Algorithm</option>
        <option value="paper">Research Paper</option>
      </select>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4 w-full" required />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Upload & Analyze</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {result && <SummaryCard data={result} />}
    </form>
  );
}

export default UploadForm;