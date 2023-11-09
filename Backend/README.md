# Human Capital Management REST API

It supports multiple user roles - admin, mod, user

- A user with the admin role can view, create, edit, and delete.

- A user with the mod role can view, create, and edit.

- A user with the user role can view.

# Getting Started

Rest requires MySQL and NODE.JS installed.

1. npm i
2. nodemon app.js

To use this API, you need to authenticate and include a valid token in your requests.

# Authentication and API

- When logging into the system, two token keys are generated. The first one for login and the second one for updating the second one. The first has a life of 1 hour, and the second has a life of 10 hours. As the second one, it can be updated 10 times and then the user will have to log in again.

- POST `/signup` - Register and receive an access token.
- POST `/signup` - Log in and receive an access token.
- POST `/create/:id` - Add info for user.

- PUT `/edit/:id` - Update info for user.

- DELETE `/delete/:id` - Delete user.
- DELETE `/delete/employee/:id` - Delete employee.

- GET `/dashboard` - Get users info.
- GET `/dashboard-view/:id` - Get user info.
