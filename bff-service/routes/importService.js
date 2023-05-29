const router = require('express').Router();
const axios = require('axios');

router.route('/import').get(async (req, res) => {
  const params = req.params;
  const headers = req.headers;

  axios({
    method: 'GET',
    url: `${process.env.IMPORT_SERVICE}/import`,
    params,
    headers,
  })
    .then((serviceResult) => {
      res.json(serviceResult);
    });
});

module.exports = router;
