const express = require('express');

const router = express.Router();
const { create, list } = require('../controllers/conferences');

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

router.get(
  '/',
  async (req, res, next) => {
    try {
      const response = await list();
      res.status(200).json(response);
      return next();
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
