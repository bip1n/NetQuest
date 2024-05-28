<h1 align="center">
🌐 Node and Express Login and Register (Enviroment Variable and Postman used)
</h1>


# Enviroment Variable

Environment variables are variables outside of a program that store configuration settings or other information that the program needs. They are part of the environment in which a process runs, and they can be accessed by the program during runtime. .

```
npm i dotenv
```

# Postman

Postman is a popular collaboration platform for API development that simplifies the process of creating, testing, and managing APIs. It provides a user-friendly interface for sending HTTP requests and inspecting responses.

```
https://www.postman.com/
```

# bcrypt

bcrypt is a password-hashing function designed to be slow and resistant to rainbow table attacks.

```
https://www.npmjs.com/package/bcrypt
```

# JWT

JWT stands for JSON Web Token. It is a compact, URL-safe means of representing claims between two parties.

```
https://www.npmjs.com/package/jsonwebtoken
```

# cors

cors means cross origin resource sharing. This is security features used to stop Cross-Site Request Forgery (CSRF) and Cross-Site Scripting (XSS).

```
npm i cors

const cors = require("cors");
// Enable CORS for all routes
app.use(cors());

// Allow requests only from a specific localhost address
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the address of your frontend
};
app.use(cors(corsOptions));
```

## Code Guide

### 1. Create post method for both login and register

```
router.post('/register', authCtrl.register);
router.post("/login", authCtrl.login);
```

### 2. use your logic for both login and register

```
 • on Register create user with password encrypted for secure (bcrypt recommended) you can use package as your choice.
 • on login create unique token for user that identifes client id which can be used on re-login or Auth verification.
 • use concept of Refresh Token and Acess Token for better security. (JWT recommended) or you can use package as your choice.
    (|── For this 4.LoginAndRegister Refresh Token is not used, since expired refresh needs to be triggred from client side eg. React, svelte etc... ──|)
 • can also use loginLimiters to verify user's bruteforce.
 • save token on cookie for further use.
```


## Dot env Structure

```

```