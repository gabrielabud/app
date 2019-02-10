const express = require('express');

const router = express.Router();
const { create } = require('../controllers/conferences');

router.post(
  '/',
  async (req, res, next) => {
    try {
      const { name } = req.body;
      const response = await create({ name });
      res.status(200).json(response);
      return next();
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
