const express = require('express');
const app = express();
const session = require('express-session');
const boradsRouter = require('./routes/boards');
const indexRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const errorRouter = require('./routes/err');
const SECRET = require('./lib/mariadb/secret/mysecret').mysecret;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views'));

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1800000,
    }
}));

app.use('/', indexRouter);
app.use('/', boradsRouter);
app.use('/kingkingsecu', adminRouter);
app.use(errorRouter);

let server = app.listen(process.env.PORT || 2237, () => {
    let port = server.address().port;
    let host = server.address().address;
    console.log(`server on : ${host}:${port}`);
});