const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const jwtSecretKey = require('./tokenUtilsUserAuth');


const fs = require('fs');

// Parse JSON request body
app.use(bodyParser.json());



app.use(cors({
    origin: '*'
}));



const { generateActivationToken } = require('./tokenUtils');


// MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});


// ...


const verifyJwt = (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token) {

        return res.json('provide token')

    } else {
        jwt.verify(token, 'jwtSecretKey', (err, decoded) => {
            if (err) {
                res.json('Not authenticated')
            } else {
                req.userId = decoded.id;
                next();
            }
        })

    }
}

app.get('/', (req, res) => {

    res.send('Hello');
})

// Handle login POST request
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM usersnew WHERE email = ? AND password = ?';
    const values = [email, password];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            return res.status(500).json({ error: 'An error occurred during login.' });
        }

        if (results.length > 0) {
            console.log(results)
            const id = results[0].id;
            const token = jwt.sign({ id }, jwtSecretKey, { expiresIn: '10h' });
            return res.json({ Login: true, token, data: results[0] });

        } else {
            // User not found or invalid credentials
            return res.status(401).json({ error: 'Invalid email or password' });
        }
    });
});


app.listen(3001, () => {
    console.log('Main server running on port 3001');
});

// app.listen(5000, () => {
//     console.log('Activation server running on port 5000');
// });

