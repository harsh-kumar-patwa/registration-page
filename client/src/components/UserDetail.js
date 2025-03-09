import React, { useState, useEffect } from 'react';
import { getUserById } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

function UserDetail() {
  const [user, setUser] = useState(null);
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        navigate('/users');
      }
    };

    fetchUser();
  }, [id, navigate]);

  if (!user) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="user-detail-container">
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p><strong>About:</strong> {user.about}</p>
    </div>
  );
}

export default UserDetail;