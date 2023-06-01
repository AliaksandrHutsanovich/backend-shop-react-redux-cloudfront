const router = require('express').Router();
const axios = require('axios');

router.route('/api/profile/cart').get(async (req, res) => {
  const headers = req.headers;

  axios
    .get(
      `${process.env.CART_SERVICE}/api/profile/cart`,
      {
        headers: {
          Authorization: headers.authorization,
        },
      },
    )
    .then((serviceResult) => {
      res.json(serviceResult.data);
    });
});

router.route('/api/profile/cart').put(async (req, res) => {
  const data = req.body;
  const headers = req.headers;

  axios
    .put(
      `${process.env.CART_SERVICE}/api/profile/cart`,
      data,
      {
        headers: {
          Authorization: headers.authorization,
        },
      }
    )
    .then(() => {
      res.send('data is saved');
    });
});

module.exports = router;
