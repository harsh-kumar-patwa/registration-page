import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import UserList from './components/UserList';
import UpdateUser from './components/UpdateUser';
import UserDetail from './components/UserDetail';
import Home from './components/Home'; 
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link> 
          </li>
          <li>
            <Link to="/register">Registration</Link> 
          </li>
          <li>
            <Link to="/users">User List</Link>
          </li>
        </ul>
      </nav>
        <Routes>
          <Route path="/" element={<Home />} /> 
            <Route path="/register" element={<RegistrationForm />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/users/update/:id" element={<UpdateUser />} />
        </Routes>
    </div>
  );
}

export default App;