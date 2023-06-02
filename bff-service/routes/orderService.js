const router = require('express').Router();
const axios = require('axios');

router.route('/order/:id').get(async (req, res) => {
  const id = req.params.id;
  axios
    .get(`${process.env.ORDER_SERVICE}/order/${id}`)
    .then((serviceResult) => {
      res.json(serviceResult.data);
    });
});

router.route('/order').get(async (req, res) => {
  axios
    .get(`${process.env.ORDER_SERVICE}/order`)
    .then((serviceResult) => {
      res.json(serviceResult.data);
    });
});

router.route('/order/:id/status').put(async (req, res) => {
  const id = req.params.id;
  axios
    .get(`${process.env.ORDER_SERVICE}/order/${id}/status`)
    .then((serviceResult) => {
      res.json(serviceResult.data);
    });
});

router.route('/api/profile/cart/checkout').post(async (req, res) => {
  const headers = req.headers;
  const data = req.body;

  axios
    .post(
      `${process.env.ORDER_SERVICE}/api/profile/cart/checkout`,
      data,
      { headers },
    )
    .then(() => {
      res.send('data is saved');
    });
});

module.exports = router;
