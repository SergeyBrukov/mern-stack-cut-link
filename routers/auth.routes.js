// const { Router } = require('express');
// const User = require('./../models/User');
// const config = require('config');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator');

// const router = Router();

// // /api/auth/register
// router.post(
//   '/register',
//   [
//     check('email', 'Uncorected email').isEmail(),
//     check('password', 'Minimum length six symbols').isLength({ min: 6 }),
//   ],
//   async (req, resp) => {
//     try {
//       const errors = validationResult(req);

//       if (!errors.isEmpty()) {
//         return resp.status(400).json({
//           errors: errors.array(),
//           message: 'Uncorected data registration',
//         });
//       }

//       const { email, password } = req.body;
//       const candidate = await User.findOne({ email: email });
//       if (candidate) {
//         return resp.status(400).json({ message: 'This user already exists' });
//       }
//       const hashedPassword = await bcrypt.hash(password, 12);

//       const user = new User({ email: email, password: hashedPassword });
//       await user.save();
//       resp.status(201).json({ message: 'User has been created' });
//     } catch (error) {
//       resp.status(500).json({ message: 'Somesing wrong, try after few seconds' });
//     }
//   },
// );

// // /api/auth/login
// router.post(
//   '/login',
//   [
//     check('email', 'Uncorected email').normalizeEmail().isEmail(),
//     check('password', 'Write password').exists(),
//   ],
//   async (req, resp) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         resp.status(400).json({ errors: errors.array, message: 'Uncorected data' });
//       }
//       const { email, password } = req.body;

//       const user = await User.findOne({ email: email });

//       if (!user) {
//         return resp.status(400).json({ message: 'User not found' });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return resp.status(400).json({ message: 'Invalid password' });
//       }
//       const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });
//       resp.json({ token: token, userId: user.id });
//     } catch (error) {
//       resp.status(500).json({ message: 'Somesing wrong, try after few second' });
//     }
//   },
// );

// module.exports = router;

const { Router } = require('express');
const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { validationResult, check } = require('express-validator');
const router = Router();

// /api/auth/register

router.post(
  '/register',
  [
    check('email', 'Uncorected email').isEmail,
    check('password', 'Minimum length six symbols').isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(req.body);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Uncorected data registration',
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      console.log(candidate);
      if (candidate) {
        return res.status(400).json({ message: 'This user already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });

      user.save();
      res.status(201).json({ message: 'User has been created' });
    } catch (error) {
      res.status(500).json({ message: 'Somesing wrong, try after few second' });
    }
  },
);

// /api/auth/login

router.post(
  '/login',
  [
    check('email', 'Uncorected email').normalizeEmail().isEmail(),
    check('password', 'Password has been writen').exists(),
    check('password', 'Password has been min 6 symbol').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Uncorected data login',
        });
      }

      const { email, password } = req.body;
      const examinationUser = await User.findOne({ email });

      if (!examinationUser) {
        return res.status(400).json({ message: 'User not found' });
      }

      const examinationUserPassword = await bcrypt.compare(password, examinationUser.password);

      if (!examinationUserPassword) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      const token = jwt.sign({ userId: examinationUser.id }, config.get('jwtSecret'));

      res.json({ token: token, userId: examinationUser.id });
    } catch (error) {
      res.status(500).json({ message: 'Somesing wrong, try after few second' });
    }
  },
);

module.exports = router;
