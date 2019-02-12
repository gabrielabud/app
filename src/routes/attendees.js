const express = require('express');

const router = express.Router();
const { create, list } = require('../controllers/attendees');

router.post(
  '/conferences/:conferenceID/attendees',
  async (req, res, next) => {
    try {
      const { conferenceID } = req.params;
      const {
        firstName, lastName, email
      } = req.body;
      const response = await create({
        conferenceID, firstName, lastName, email
      });
      res.status(200).json(response);
      return next();
    } catch (error) {
      return next(error);
    }
  }
);

router.get(
  '/attendees',
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
