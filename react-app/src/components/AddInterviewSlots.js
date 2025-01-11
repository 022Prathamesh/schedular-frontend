import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

function AddInterviewSlots() {
  const [formData, setFormData] = useState({
    applicant_name: '',
    role: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication error. Please log in again.');
        return;
      }

      // Decode the token to get the user ID
      const decodedToken = jwtDecode(token);
      const createdBy = decodedToken.id; // Adjust key name based on your token structure

      // Combine date and time fields into ISO strings
    const formattedStartTime = new Date(`${formData.date}T${formData.startTime}`).toISOString();
    const formattedEndTime = new Date(`${formData.date}T${formData.endTime}`).toISOString();

    // Create the final data object
    const dataToSubmit = {
      applicant_name: formData.applicant_name,
      role: formData.role,
      date: new Date(formData.date).toISOString(), // Save the date part
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      createdBy,
    };
      const response = await fetch('https://schedular-backend-xi.vercel.app/api/schedule_interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in headers
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Slot added successfully!');
        // Redirect to "Get Slots" page
        navigate('/get-slots');
      } else {
        setError(result.message || 'Failed to add slot.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Add Interview Slots</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f9f9f9',
        }}
      >
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="applicant_name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Applicant Name:
          </label>
          <input
            type="text"
            id="applicant_name"
            name="applicant_name"
            value={formData.applicant_name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="role" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Role:
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="date" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="startTime" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Start Time:
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="endTime" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            End Time:
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Add Slot
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
    </div>
  );
}

export default AddInterviewSlots;
