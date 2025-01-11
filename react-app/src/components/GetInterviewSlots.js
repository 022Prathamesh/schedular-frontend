import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GetInterviewSlots() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Fetch interview slots from the API
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch('https://schedular-backend-xi.vercel.app/api/schedule_interview');
        const result = await response.json();

        if (response.ok) {
          setSlots(result.result || []);
        } else {
          setError(result.message || 'Failed to fetch slots.');
        }
      } catch (err) {
        setError('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Get Interview Slots</h1>

      {loading && <p style={{ color: '#007bff' }}>Loading slots...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && slots.length === 0 && !error && (
        <p style={{ color: '#555' }}>No slots found.</p>
      )}

      {!loading && slots.length > 0 && (
        <table
          style={{
            width: '80%',
            margin: '20px auto',
            borderCollapse: 'collapse',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Applicant Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Role</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Start Time</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>End Time</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, index) => (
              <tr key={index} style={{ textAlign: 'center' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{slot.applicant_name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{slot.role}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {new Date(slot.date).toLocaleDateString()}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {new Date(slot.startTime).toLocaleTimeString()}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {new Date(slot.endTime).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={() => navigate('/add-slots')}
        style={{
          marginTop: '20px',
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Add Slots
      </button>
    </div>
  );
}

export default GetInterviewSlots;
