# Human Capital Management REST API

It supports multiple user roles - admin, mod, user

# Getting Started

Rest requires MySQL and NODE.JS installed.

1. npm i
2. nodemon app.js

To use this API, you need to authenticate and include a valid token in your requests.

# Authentication and API

- POST `/signup` - Register and receive an access token.
- POST `/signup` - Log in and receive an access token.
- POST `/create/:id` - Add info for user.

- PUT `/edit/:id` - Update info for user.

- DELETE `/delete/:id` - Delete user.
- DELETE `/delete/employee/:id` - Delete employee.

- GET `/dashboard` - Get users info.
- GET `/dashboard-view/:id` - Get user info.
