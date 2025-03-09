const express = require('express');
const router = express.Router();
const User = require('../models/User');


// Create (POST)
router.post('/', async (req, res) => {
    try {
        const { name, age, dateOfBirth, password, gender, about } = req.body;

        // Basic Validation 
        if (!name || !age || !dateOfBirth || !password || !gender) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        // Check if the date is valid
        if (isNaN(Date.parse(dateOfBirth))) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

       //check the password
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
        if (!passwordRegex.test(password)) {
          return res.status(400).json({ message: 'Password must be alphanumeric and contain at least one digit' });
        }

        const existingUser = await User.findOne({ name: name }); //Check with name if the user exist or not.
        if (existingUser) {
            return res.status(400).json({ message: 'User with this name already exists' });
        }
        const newUser = new User({
            name,
            age,
            dateOfBirth,
            password,
            gender,
            about
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read (GET - All Users)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read (GET - Single User by ID)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
      if (error.name === 'CastError') {  // Handle invalid ID format
          return res.status(400).json({ message: 'Invalid user ID' });
      }
        res.status(500).json({ message: error.message });
    }
});
  // Add a new route to fetch gender options
  router.get('/gender/options', (req, res) => {
    res.json(['Male', 'Female', 'Other']);
  });

// Update (PUT - Update User by ID)
router.put('/:id', async (req, res) => {
    try {
        const { name, age, dateOfBirth, gender, about } = req.body;

         // Basic Validation (you should use a validation library like Joi for more robust checks)
        if (!name || !age || !dateOfBirth || !gender) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
         // Check if the date is valid
        if (isNaN(Date.parse(dateOfBirth))) {
            return res.status(400).json({ message: 'Invalid date format' });
        }
        //check the password

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            name,
            age,
            dateOfBirth,
            gender,
            about
        }, { new: true }); 

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
      if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        res.status(500).json({ message: error.message });
    }
});

// Delete (DELETE - Delete User by ID)
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (error) {
      if (error.name === 'CastError') {
          return res.status(400).json({ message: 'Invalid user ID' });
      }
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;