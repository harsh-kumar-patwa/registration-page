import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api';
import { Link } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);
  const [deleteSuccess,setDeleteSuccess] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [deleteSuccess]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
          setDeleteSuccess(prev => !prev);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>
                <Link to={`/users/${user._id}`} className="view-button">View</Link>
                <Link to={`/users/update/${user._id}`} className="update-button">Update</Link>
                <button onClick={() => handleDelete(user._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;