
# Blog Project

This is a simple blog web application built with Node.js, Express.js, and MongoDB.


## Features

- Admin login, logout, change password, edit profile
- Forgot Password,Reset Password
- Create, edit, delete blog posts
- Categorize posts with categories and subcategories
- Homepage slider/featured posts
- Contact us page
- Three Column Gallary
- Manage posts,categories and subcategories in admin dashboard
- Uses online MongoDB cluster database


## Usage
## Install dependencies

```javascript
npm init
npm run dev
```

Configure `.env`

Copy the `.env.example` file to `.env` and update the MongoDB URI and other environment variables.

#### Run Server

```javascript
npm start
```
This will start the node server on port 8002. The app will be available at **localhost:8002**

#### Admin credentials
Default admin email and password is set to `admin@gmail.com` and `admin123` respectively.

#### Customization
The app can be customized by editing code in the following folders:
- `routes` - Express route handlers
- `models` - MongoDB schemas
- `controllers` - request handlers
- `views` - EJS templates

#### Authentication
The app uses [Passport.js](https://www.passportjs.org/) for authentication along with express-session for managing user sessions.

Some relevant authentication related info:
#### Strategies
 Local strategy for email/password based login

The app also has middleware for:

- Authentication check on protected routes
- Checking for admin role access

#### Pasport Usage 

To implement authentication in a new app:

- Configure session and passport 
- Add login/register routes and passport auth 
- Use `passport.checkAuth` middleware on protected routes
- Access logged in user in templates via user variable
The full implementation can be checked out in source code under [config/authpassport-local.js](https://github.com/dhruvil-kathiriya/Blog-Project/blob/master/config/passport-local.js)
## License

This project is open-sourced under the [MIT License](https://choosealicense.com/licenses/mit/)

