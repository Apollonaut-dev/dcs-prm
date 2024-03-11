import { Router } from 'express';
import * as Password from '../util/password.js';
import { User } from '../models/User.js';

const router = Router();

// signup

router.post('/signup', async (req, res, next) => {
  const { name, email, password } = req.body;
  let hashed_pw;
  try {
    hashed_pw = Password.hash(password);
  } catch (e) {
    // password hash error
    res.statusCode(500);
    return next(e);
  }
  try {
    await User.create({
      name: name,
      email: email,
      password_hash: hashed_pw
    });
    res.status(200).json({ message: 'OK', data: null });
  } catch (e) {
    // db error
    e.statusCode = res.statusCode = res.statusCode || 500;
    return next(e);
  }
});

router.post('/signin', async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ where: { email: email }});
    if (!user) {
      const error = new Error('unauthorized');
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await Password.compare(password, user.password_hash);
    if (!isEqual) {
      const error = new Error('unauthorized');
      error.statusCode = 401;
      throw error;
    }
    // TODO asyncify
    // TODO store secret on disk outside project dir (e.g. .ssh), store path in config
    const token = jwt.sign(
      {
        user_id: user.id
      },
      'somesupersecretsecret',
      { expiresIn: '24h' }
    );
    return res.status(200).json({ message: 'OK', data: token });
  } catch (e) {
    e.statusCode = res.statusCode = res.statusCode || 500;
    return next(e);
  }
});

router.post('/signout', async (req, res, next) => {

});

// create -- copy of signup
router.post('/', async (req, res, next) => {
  const { name, email, password } = req.body;
  let hashed_pw;
  try {
    hashed_pw = Password.hash(password);
  } catch (e) {
    // password hash error
    res.statusCode(500);
    return next(e);
  }
  try {
    await User.create({
      name: name,
      email: email,
      password_hash: hashed_pw
    });
    res.status(200).json({ message: 'OK', data: null });
  } catch (e) {
    // db error
    e.statusCode = res.statusCode = res.statusCode || 500;
    return next(e);
  }
});

// read
router.get('/', async (req, res, next) => {

});

// update
router.put('/', async (req, res, next) => {

});

// delete
router.delete('/', async (req, res, next) => {

});

export default router;