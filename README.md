## URL Shortener Application

### Server

#### Install below package/module/library.
- `npm i express mongoose nodemon shortid dotenv cors bcrypt cookie-parser jsonwebtoken`

#### Routes
- POST ["/originalUrl"] : Create shortener url.
- GET ["/:shortUrl"] : Find shortener url and redirect.
- GET ["/analytics/:shortUrl"] : Analytics of number of times click each url.

### Client

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