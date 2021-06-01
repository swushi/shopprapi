const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email=$1', [email], async (err, result) => {
    if (result.rowCount === 1) {
      const dbUser = result.rows[0];
      bcrypt.compare(password, dbUser.password, (err, same) => {
        if (same) {
          const token = jwt.sign({
            email,
            userId: dbUser.userid
          },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          )

          return res.status(201).json({ message: 'Authentication successful', token });
        } else {
          return res.status(401).json({ message: 'Authentication failed' });
        }
      })
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  });
})

module.exports = router;