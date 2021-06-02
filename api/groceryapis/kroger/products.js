const express = require('express');
const fetch = require('node-fetch');
const { base64 } = require('../../utils');
const authCheck = require('../../middleware/auth-check');

const router = express.Router();

router.get('/', authCheck, async (req, res) => {
  const { ktoken } = req.headers;
  const { term, limit } = req.query;

  const tokenUrl = process.env.KROGER_BASE_URL + `products?filter.term=${term}&filter.limit=${limit || 10}`;

  try {
    const response = await fetch(tokenUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ktoken}`,
      },
    });

    const data = await response.json();
    return res.status(200).json(data);
  }
  catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Failed to get Kroger Products' });
  }

})

module.exports = router;