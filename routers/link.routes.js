const { Router } = require('express');
const Link = require('./../models/Link');
const config = require('config');
const shortID = require('shortid');
const authMidelware = require('./../middlaware/auth.midleware');

const router = Router();

router.post('/genarate', authMidelware, async (req, res) => {
  console.log('>>>>>>>', req.user.userId);

  try {
    const baseURL = config.get('baseURL');
    const { from } = req.body;
    const code = shortID.generate();
    const existing = await Link.findOne({ from });
    if (existing) {
      return res.json({ link: existing });
    }
    const to = baseURL + '/t/' + code;

    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();
    res.status(201).json({ link });
  } catch (error) {
    res.status(500).json({ message: 'Somesing wrong, try after few second' });
  }
});

router.get('/', authMidelware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    console.log(req.user.userId);
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Somesing wrong, try after few second' });
  }
});

router.get('/:id', authMidelware, async (req, res) => {
  try {
    const links = await Link.findById(req.params.id); /// ????
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Somesing wrong, try after few second' });
  }
});

module.exports = router;
