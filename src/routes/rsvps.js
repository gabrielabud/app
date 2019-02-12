const express = require('express');

const router = express.Router();
const { create, list, listByTalkID } = require('../controllers/rsvps');

router.post(
  '/rsvps/talks/:talkID/attendees/:attendeeID',
  async (req, res, next) => {
    try {
      const { talkID, attendeeID } = req.params;
      const response = await create({
        talkID, attendeeID
      });
      res.status(200).json(response);
      return next();
    } catch (error) {
      return next(error);
    }
  }
);

router.get(
  '/rsvps',
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

router.get(
  '/rsvps/talks/:talkID',
  async (req, res, next) => {
    try {
      const { talkID } = req.params;
      const response = await listByTalkID(talkID);
      res.status(200).json(response);
      return next();
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
