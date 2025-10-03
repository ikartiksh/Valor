import { useEffect, useState } from 'react';
import UploadForm from '../components/UploadForm.jsx';
import api from '../services/api';

function DashboardPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/content/history');
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <UploadForm onUpload={(newItem) => setHistory([...history, newItem])} />
      <h3 className="text-xl mt-6 mb-2">Upload History</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <p><strong>Type:</strong> {item.type}</p>
            <p><strong>Summary:</strong> {item.summary}</p>
            <p><strong>Rating:</strong> {item.rating}/10</p>
            <p><strong>Price:</strong> ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;