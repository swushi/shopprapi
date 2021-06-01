const { Pool } = require('pg')
const pool = new Pool({
  user: 'sam',
  host: 'localhost',
  database: 'sam',
  port: 5432,
});

module.exports = {
  query: (query, params, callback) => {
    return pool.query(query, params, callback);
  }
}