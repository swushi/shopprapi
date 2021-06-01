const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.post('/', (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      res.status(400).json({ message: 'bad email' })
      throw 'email mismatch';
    }
    db.query('SELECT * FROM users WHERE email=$1', [email], async (err, result) => {
      if (result.rowCount === 0) {
        const hash = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hash], (err, result) => {
          if (err) {
            res.status(400).json({ message: 'Could not create user' });
          }
          res.status(201).json({ message: `User created with email: ${email}` });
        })
      } else {
        res.status(400).json({ message: 'Could not create user' });
      }
    })

  } catch (error) {
    res.status(400).json({ message: 'Could not create user' });
  }

})

module.exports = router;