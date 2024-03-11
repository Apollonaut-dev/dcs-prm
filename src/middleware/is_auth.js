// do some JWT stuff
import JWT from 'jsonwebtoken';

// let test_user = 1;
// export function stub(uid) {
//   test_user = uid;
// }

export default function (req, res, next) {
  // if (process.env.NODE_ENV == 'test') {
  //   req.user_id = test_user;
  //   return next();
  // }

  // decode the token
  // from udemy project
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = JWT.verify(token, 'somesupersecretsecret');
    if (!decodedToken) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }
    req.user_id = decodedToken.userId;
    next();
  } catch (e) {
    e.statusCode = res.statusCode = res.statusCode || 500;
    next(e);
  }

}