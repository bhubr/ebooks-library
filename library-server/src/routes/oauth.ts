import express from 'express';

import getAccessToken from '../helpers/get-access-token';

const router = express.Router();

router.post('/token', async (req, res) => {
  const { code } = req.body;
  try {
    const data = await getAccessToken(code);
    console.log('got data', data)
    res.json({
      accessToken: data.get('access_token'),
    });
  } catch (err) {
    console.error('Error while requesting a token', err.response.status);
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;

