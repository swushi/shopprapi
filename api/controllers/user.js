const db = require('../db');

module.exports = {
  getAllUsers: (req, res) => {
    db.query('SELECT * FROM users ORDER BY userid', [], (error, result) => {
      if (error) {
        throw error;
      }

      res.status(200).json(result.rows);
    })
  },

  updateUser: (req, res) => {
    const { userid } = req.params;
    const { email, password } = req.body;
    db.query(
      'UPDATE users SET email = COALESCE($1, email), password = COALESCE($2, password) WHERE userid = $4',
      [email, password, userid],
      (error, result) => {
        if (error) {
          throw error;
        }

        res.status(200).json(result.rows);
      })
  },

  getUser: (req, res) => {
    const { userid } = req.params;

    db.query(
      'SELECT * FROM users as u\
       INNER JOIN kroger_details as k \
       ON u.userid=k.userid \
       WHERE u.userid=$1;',
      [userid],
      (error, result) => {
        if (error) {
          return res.status(400).json({ message: 'Failed to fetch user' })
        }

        res.status(200).json(result.rows);
      }
    )
  }
}