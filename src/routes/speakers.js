const express = require('express');

const router = express.Router();
const { create, list, listByTalkID } = require('../controllers/speakers');

router.post(
  '/talks/:talkID/speakers',
  async (req, res, next) => {
    try {
      const { talkID } = req.params;
      const {
        firstName, lastName, email, bio, photoUrl
      } = req.body;
      const response = await create({
        talkID, firstName, lastName, email, bio, photoUrl
      });
      res.status(200).json(response);
      return next();
    } catch (error) {
      return next(error);
    }
  }
);

router.get(
  '/talks/:talkID/speakers',
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

router.get(
  '/speakers',
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
