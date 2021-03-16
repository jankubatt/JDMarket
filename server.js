/*
    Author: Jan Kubat
    Web: jankubat-it.cz
    Twitter: JanKubat8
*/

const express = require("express");
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "jdmarket",
    password: "jdmarket",
    database: "jdmarket"
});

app.use(express.static('app'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(session({
	secret: 'jdmarket',
	resave: true,
	saveUninitialized: true
}));

app.post("/insertUser", (req, res) => {
    bcrypt.hash(req.body.pass, 10, (err, hash) => {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            let sql = `INSERT INTO users (name, password, email) VALUES ('${req.body.name}', '${hash}', '${req.body.email}')`;
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) throw err;
            });
        });
    });

    res.sendStatus(200);
});

app.post("/checkIfUserExists", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = `SELECT name FROM users WHERE name = '${req.body.name}'`;
        connection.query(sql, (err, result) => {
            connection.release();
            if (err) throw err;
            if (Object.keys(result).length === 0) {
                res.send({
                    msg: false
                });

            } else {
                res.send({
                    msg: true
                });
            }
        });
    });
});

app.post("/authUser", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = `SELECT * FROM users WHERE email = '${req.body.email}'`;
        connection.query(sql, (err, result) => {
            connection.release();
            if (err) throw err;
            if (Object.keys(result).length === 0) {
                res.send({
                    msg: false
                });
            } else {
                bcrypt.compare(req.body.pass, result[0].password, function (err, result) {
                    if (result) {
                        res.send({
                            msg: true
                        });
                    } else {
                        res.send({
                            msg: false
                        });
                    }
                });
            }
        });
    });
});

app.get("/getProducts", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        if (req.query.search == "") {
            let sql = `SELECT * FROM products`;
            connection.query(sql, (err, result) => {
                connection.release();
                res.send(result);
            });
        } else {
            let sql = `SELECT * FROM products WHERE name LIKE '%${req.query.search}%'`;
            connection.query(sql, (err, result) => {
                connection.release();
                res.send(result);
            });
        }
    });
});

app.get("/filterProducts", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let priceFrom = req.query.filter.priceFrom;
        let priceTo = req.query.filter.priceTo;
        let rating = req.query.filter.rating;
        let makeYear = req.query.filter.makeYear;
        let kilometers = req.query.filter.kilometers;
        let vehicles = req.query.filter.vehicles;
        vehicles = vehicles.slice(0, -1);
        let sql = `SELECT * FROM products WHERE price >= ${priceFrom} AND price <= ${priceTo}`;
        if (rating != 0) sql += ` AND rating = ${rating}`;
        if (makeYear != "All") sql += ` AND makeYear = ${makeYear}`;
        if (kilometers != "200000+") sql += ` AND kilometers <= ${kilometers}`;
        if (vehicles != "") sql += ` AND vehicle IN (${vehicles})`;
        connection.query(sql, (err, result) => {
            connection.release();
            res.send(result);
        });
    });
});

app.get("/getCart", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = `SELECT cart FROM users WHERE email = '${req.query.user}'`;
        connection.query(sql, (err, result) => {
            connection.release();
            res.send(result);
        });
    });
});

app.post("/putInCart", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = `UPDATE users SET cart = CONCAT(cart, '${req.body.item.id}') WHERE email = "${req.body.email}"`;
        connection.query(sql, (err, result) => {
            connection.release();
            res.sendStatus(200);
        });
    });
});

app.post("/removeFromCart", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = `UPDATE users SET cart = '${req.body.cart}' WHERE email = "${req.body.user}"`;
        connection.query(sql, (err, result) => {
            connection.release();
            res.sendStatus(200);
        });
    });
});

app.listen(process.env.PORT || 3000);
console.log('Server up and running on port: ' + (process.env.PORT || 3000));