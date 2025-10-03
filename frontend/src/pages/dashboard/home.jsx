import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Typography, Select, Input, Button, Table, TableHeader, TableBody, TableRow, TableCell } from '@material-tailwind/react';
import api from '../../services/api';

export function Home() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState('code');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/content/history');
        setHistory(res.data);
      } catch (err) {
        console.error('Failed to fetch history:', err);
      }
    };
    fetchHistory();
  }, []);

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
      setHistory([...history, { ...res.data, type }]);
      setError('');
    } catch (err) {
      setError('Upload failed: ' + (err.response?.data?.message || 'Try again'));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Card className="mb-6">
        <CardHeader color="blue-gray" className="relative h-16">
          <Typography variant="h5" color="white">
            Upload Content
          </Typography>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleUpload}>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="Content Type"
              className="mb-4"
            >
              <option value="code">Code</option>
              <option value="lyrics">Music Lyrics</option>
              <option value="algorithm">Algorithm</option>
              <option value="paper">Research Paper</option>
            </Select>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4"
              required
            />
            <Button type="submit" className="bg-blue-500" fullWidth>
              Upload & Analyze
            </Button>
            {error && (
              <Typography color="red" className="mt-4">
                {error}
              </Typography>
            )}
            {result && (
              <Card className="mt-4">
                <CardBody>
                  <Typography variant="h6" color="blue-gray">
                    Analysis Result
                  </Typography>
                  <Typography><strong>Type:</strong> {result.type}</Typography>
                  <Typography><strong>Summary:</strong> {result.summary}</Typography>
                  <Typography><strong>Rating:</strong> {result.rating}/10</Typography>
                  <Typography><strong>Price:</strong> ${result.price}</Typography>
                </CardBody>
              </Card>
            )}
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader color="blue-gray" className="relative h-16">
          <Typography variant="h5" color="white">
            Upload History
          </Typography>
        </CardHeader>
        <CardBody>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Summary</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.summary}</TableCell>
                  <TableCell>{item.rating}/10</TableCell>
                  <TableCell>${item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Home;