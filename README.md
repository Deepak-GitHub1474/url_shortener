## URL Shortener Application

### Server

#### Install below package/module/library.
- `npm i express mongoose nodemon shortid dotenv cors bcrypt cookie-parser jsonwebtoken`

#### Routes
- POST ["/originalUrl"] : Create shortener url.
- GET ["/:shortUrl"] : Find shortener url and redirect.
- GET ["/analytics/:shortUrl"] : Analytics of number of times click each url.