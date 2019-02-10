const express = require('express');

const router = express.Router();
const { create, list } = require('../controllers/talks');

router.post(
  '/conferences/:conferenceID/talks',
  async (req, res, next) => {
    try {
      const { conferenceID } = req.params;
      const {
        title, description, startDatetime, endDatetime, maximumAttendance
      } = req.body;
      const response = await create({
        conferenceID, title, description, startDatetime, endDatetime, maximumAttendance
      });
      res.status(200).json(response);
      return next();
    } catch (error) {
      return next(error);
    }
  }
);

router.get(
  '/talks',
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
