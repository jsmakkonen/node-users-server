const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const port = 3001;

app.use(cors());
app.use(express.json());

// Get all users
app.get('/users', async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users ORDER BY id ASC");
        res.json(allUsers.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// Get single user
app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const singleUser = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(singleUser.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// Create new user
app.post('/users', async (req, res) => {
    try {
        const { first, last, email, phone, location, hobby } = req.body;
        const newUser = await pool.query("INSERT INTO users (first, last, email, phone, location, hobby) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [first, last, email, phone, location, hobby]);
        res.json(newUser.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// Update user
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { first, last, email, phone, location, hobby } = req.body;
        const updateUser = await pool.query("UPDATE users SET first = $1, last = $2, email = $3, phone = $4, location = $5, hobby = $6 WHERE id = $7", [first, last, email, phone, location, hobby, id]);
        res.json('User was updated');
    } catch (err) {
        console.log(err.message);
    }
});

// Delete user
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        res.json('User was deleted');
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});