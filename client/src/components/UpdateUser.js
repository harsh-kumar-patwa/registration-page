import React, { useState, useEffect } from 'react';
import { updateUser, getUserById, getGenderOptions } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        dateOfBirth: '',
        gender: '',
        about: '',
    });
    const [genderOptions, setGenderOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');

    useEffect(() => {
        const fetchUserAndOptions = async () => {
             const fetchGenderOptions = async () => {
                try {
                    const response = await getGenderOptions();
                    setGenderOptions(response.data);
                } catch (error) {
                    console.error("Failed to fetch gender options:", error);
                }
            };
            try {
                const userResponse = await getUserById(id);
                const userData = userResponse.data;
                const formattedDate = new Date(userData.dateOfBirth).toISOString().split('T')[0];

                setFormData({
                    name: userData.name,
                    age: userData.age,
                    dateOfBirth: formattedDate, 
                    gender: userData.gender,
                    about: userData.about,
                });
            } catch (error) {
                console.error('Error fetching user:', error);
                navigate('/users');  
            }
             fetchGenderOptions();
        };

        fetchUserAndOptions();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

   const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
            isValid = false;
        }

        if (isNaN(formData.age) || formData.age < 0 || formData.age > 120) {
            newErrors.age = 'Age must be a number between 0 and 120';
            isValid = false;
        }

        if (!formData.dateOfBirth || isNaN(Date.parse(formData.dateOfBirth))) {
            newErrors.dateOfBirth = "Please enter a valid date";
            isValid = false;
        }
        if (!formData.gender) {
            newErrors.gender = 'Please select a gender';
            isValid = false;
        }

        if (formData.about.length > 5000) {
            newErrors.about = 'About must be less than 5000 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateSuccess(false);
    setUpdateError('');

        if(!validateForm()){
            return;
        }

        try {
            const response = await updateUser(id, formData);
            console.log('User updated:', response.data);
            setUpdateSuccess(true);
            navigate('/users'); 

        } catch (error) {
             console.error('Error Update user:', error);
            if (error.response) {
                setUpdateError(error.response.data.message || 'An error occurred');
            } else {
                setUpdateError('An error occurred');
            }
        }
    };

    return (
        <div className="update-user-container">
            <h2>Update User</h2>
            <form onSubmit={handleSubmit} className="update-form">
                 <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Please enter your name"
                    />
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Please enter your age"
                    />
                    {errors.age && <div className="error">{errors.age}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                    {errors.dateOfBirth && <div className="error">{errors.dateOfBirth}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select...</option>
                        {genderOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {errors.gender && <div className="error">{errors.gender}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="about">About</label>
                    <textarea
                        id="about"
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        placeholder="Tell us about yourself (optional)"
                    />
                    {errors.about && <div className="error">{errors.about}</div>}
                </div>

                <button type="submit" className="submit-button">Update User</button>
                {updateSuccess && <div className="success">User Updated successfully!</div>}
                {updateError && <div className="error">{updateError}</div>}
            </form>
        </div>
    );
}

export default UpdateUser;