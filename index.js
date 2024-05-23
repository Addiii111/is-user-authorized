const jwt = require('jsonwebtoken');
const cookie = require('cookie');

function isUserAuthorized(req, secretKey , tokenName) {
  
  const cookies = req.headers.cookie;
  if (!cookies) {
    console.log('Cookie does not exist in the request')
    return false;
  }

  const parsedCookies = cookie.parse(cookies);
  const token = parsedCookies[tokenName];
  
  if (!token) {
    console.log(`${tokenName} does not exist in the cookie`);
    return false;
  }

  try {
    
    const decoded = jwt.verify(token, secretKey);
    
    req.userData = decoded
    
    console.log('User authenticated successfully');
    return true;
  } catch (err) {
    console.log("error in verifying token" , err);
    return false;
  }
}

 function authMiddleware(secretKey,tokenName = 'accessToken') {
    return (req, res, next) => {
      if (isUserAuthorized(req, secretKey,tokenName)) {
        next();
      } else {
        console.log('Unauthorized User');
        res.status(401).json({ message: 'Unauthorized User' });
      }
    };
  }
  

 
  
  module.exports = { authMiddleware};