# Goalsetter MERN app

[![wakatime](https://wakatime.com/badge/user/4ce09006-1b8c-491f-ace1-a70b32d5fc1c/project/bb2a11ed-9637-4b60-8185-b7d35ccad382.svg?style=for-the-badge)](https://wakatime.com/badge/user/4ce09006-1b8c-491f-ace1-a70b32d5fc1c/project/bb2a11ed-9637-4b60-8185-b7d35ccad382)

This is a simple MERN app that allows users to create goals and track their progress.

## Usage

First add your _MONGO_URI_ in `.env` file

## Install dependencies

### Backend depedencies

```
npm install
```

### Frontend depedencies

```
cd frontend
npm install
```

### Run Server

```
npm run bed
npm run fed
```

## API Specifications

### Goals

**Goals Routes**

- `GET /api/goals`
- `POST /api/goals`
- `GET /api/goals/:id`
- `PUT /api/goals/:id`
- `DELETE /api/goals/:id`

  **Goal Progress**

- `GET /api/goals/:id/progress`
- `POST /api/goals/:id/progress`
- `PUT /api/goals/:id/progress/:progressId`
- `DELETE /api/goals/:id/progress/:progressId`

  **Goal Progress Comments**

- `GET /api/goals/:id/progress/:progressId/comments`
- `POST /api/goals/:id/progress/:progressId/comments`
- `PUT /api/goals/:id/progress/:progressId/comments/:commentId`
- `DELETE /api/goals/:id/progress/:progressId/comments/:commentId`

### Users & Authentication

- Authentication will be ton using JWT/cookies
  - JWT and cookie should expire in 30 days
- User registration
  - Once registered, a token will be sent along with a cookie (token = xxx)
  - Passwords must be hashed
- User login
  - User can login with email and password
  - Plain text password will compare with stored hashed password
  - Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  - Cookie will be sent to set token = none
- Get user
  - Route to get the currently logged in user (via token)
- Password reset (lost password)
  - User can request to reset password
  - A hashed token will be emailed to the users registered email address
  - A put request can be made to the generated url to reset password
  - The token will expire after 10 minutes
- Update user info
  - Authenticated user only
  - Separate route to update password
- User CRUD
  - Admin only
- Users can only be made admin by updating the database field manually

### Security

- Encrypt passwords and reset tokens
- Prevent NoSQL injections
- Add headers for security (helmet)
- Prevent cross site scripting - XSS
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Use cors to make API public (for now)

## Tech Stack

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [JWT](https://jwt.io/)
- [BCrypt](https://www.npmjs.com/package/bcrypt)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
