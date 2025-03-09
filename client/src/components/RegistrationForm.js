import React, { useState, useEffect } from 'react';
import { createUser, getGenderOptions } from '../services/api';
import { useNavigate } from 'react-router-dom'; 

function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        dateOfBirth: '',
        password: '',
        gender: '',
        about: '',
    });
    const [genderOptions, setGenderOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const navigate = useNavigate(); 


    useEffect(() => {
        const fetchGenderOptions = async () => {
            try {
                const response = await getGenderOptions();
                setGenderOptions(response.data);
            } catch (error) {
                console.error("Failed to fetch gender options:", error);
            }
        };

        fetchGenderOptions();
    }, []);


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
        } else {
            const selectedDate = new Date(formData.dateOfBirth);
            const currentDate = new Date();
            
            if (selectedDate > currentDate) {
                newErrors.dateOfBirth = "Date of birth cannot be in the future";
                isValid = false;
            }
        }

        if (formData.password.length < 10 || !/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(formData.password)) {
            newErrors.password = 'Password must be at least 10 characters and alphanumeric';
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
        setSubmitSuccess(false);
        setSubmitError('');

        if (!validateForm()) {
            return;
        }

        try {
            const response = await createUser(formData);
            console.log('User created:', response.data);
            setSubmitSuccess(true);
            setFormData({
                name: '',
                age: '',
                dateOfBirth: '',
                password: '',
                gender: '',
                about: '',
            });

              navigate('/users');

        } catch (error) {
            console.error('Error creating user:', error);
            if (error.response) {
                setSubmitError(error.response.data.message || 'An error occurred');
            } else {
                setSubmitError('An error occurred');
            }
        }
    };

    return (
        <div className="registration-container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit} className="registration-form">
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
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Please enter your password"
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
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

                <button type="submit" className="submit-button">Register</button>

                {submitSuccess && <div className="success">User registered successfully!</div>}
                {submitError && <div className="error">{submitError}</div>}
            </form>
        </div>
    );
}

export default RegistrationForm;