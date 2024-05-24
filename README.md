# is-user-authorized
is-user-authorized is a simple npm package designed to verify if a logged-in user is authorized based on a token stored in cookies.
  This package is particularly useful for Node.js applications using JWT (JSON Web Tokens) for authentication. It provides an easy-to-use function to validate the token and ensure the user is authorized to access protected resources.

## Features

- **Easy Integration**: Seamlessly integrates with any Node.js application.
- **Token Verification**: Verifies JWT tokens stored in cookies.
- **Secure**: Uses industry-standard JWT for token verification.
- **Middleware Compatible**: Can be used as middleware in Express.js and other frameworks.

## Installation

Install the package via npm:

```sh
$ npm install is-user-authorized
```

## Usage
```js
const {authMiddleware} = require('is-user-authorized');
```
#### Using as Express Middleware

##### You can use this package as middleware in an Express.js application to protect routes:

```js
const express = require('express');
const { authMiddleware } = require('is-user-authorized');

const app = express();
const port = 3000;
const secretKey = 'your_jwt_secret'; // Replace with your actual JWT secret
const tokenName = 'your_jwt_tokenName'; // Replace with your actual JWT token name

// Public route (no authentication required)
app.get('/', (req, res) => {
  res.send('Welcome to the public route!');
});

// Protected route (authentication required)
app.get('/protected', authMiddleware(secretKey,tokenName), (req, res) => {
  res.send('Welcome to the protected route!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

```
## API

- authMiddleware(secretKey, tokenName)
  * secretKey -[REQUIRED] - Your JWT Secret Key
  * tokenName -[OPTIONAL] - Your JWT Token Name **{Optional when your token name is 'accessToken'}** 


## Note 
 After successful authorization, the package extracts useful information from the JWT token and appends it to the **req.userData** property. This allows subsequent middleware and route handlers to access user-specific information such as user ID, roles, and other claims embedded within the token.