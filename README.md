## URL Shortener Application

### Application Overview
This is a full stack project. This application allows users to input a long URL 
and receive a shortened version of it. When users visit the shortened URL, 
they will be redirected to the original long URL. User registration and login to use
this application. User dashboard where they can view their list of shortened URLs 
and manage them (edit, delete, view analytics). To perform CRUD operation users will be
authenticated so that they can perform CRUD opertaion only on their or URLs.
This application also have track and display basic analytics such as the number of 
times each shortened URL has been clicked and the timestamps to keep track of times too.

### Features:
- User registration with unique credential only[Here unique credential is email].
- User login
- JWT token based authentication
- Creating short URL of provided long form URL.
- Edit the short url.
- Delete the short url.
- Redirecting to original url on click over short url.
- Analytics of number of times each url clicked or number of people visited on perticular url.
- Timestamps of visiting times
- Responsive and attractive UI.
- Loader to engage the user while fetching the data from database.

### Frameworks/Library/Tools/Host 
- React.jS
- Tailwind CSS
- Node.Js
- Express.Js
- Mongoose
- MongoDB
- JSON Web Token
- Cloudinary
- Render

### Server setup

#### Install below package/module/library.
- `npm i express mongoose nodemon shortid dotenv cors bcrypt cookie-parser jsonwebtoken`

#### Routes
- GET ["/test"] : Only for testing purpose.
- GET ["/"] : Landing page[Home page].
- POST ["/originalUrl"] : Create shortener url.
- GET ["/:shortUrl"] : Find shortener url and redirect.
- GET ["/shorturls"] : Get all short url.
- GET ["/analytics/:shortUrl"] : Analytics of number of times click each url.
- POST ["/register"] : New User register.
- POST ["/login"] : User login.
- GET ["/login"] : User Logout.
- DELETE ["/deleteUrl/:id"] : Delete short url.
- PATCH ["/updateUrl/:id"] : Update short url.


### Client setup

### Configure tailwind CSS in VIte-React

#### Install Tailwind CSS
- `npm install -D tailwindcss post`
- `npx tailwindcss init -p`

#### tailwind.config.js
- `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`

#### index.css
-  `@tailwind base;
@tailwind components;
@tailwind utilities;`