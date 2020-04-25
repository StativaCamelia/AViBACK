const mongoose = require('mongoose');
const {User} = require("../../models/index");
const jwt = require('jsonwebtoken');

exports.getRes = async (req, parsedReq, res) => {
    const {fullPath, method, body} = parsedReq;
    if (fullPath.endsWith("/") && method === "post") {
        let user = new User({
            username: body.username,
            password: body.password
        });
        const message = user.validateUserLogin();
        if (message !== '') {
            res.writeHead(400, {'Content-Type': 'text/html'});
            res.write(message);
            console.log(message)
            res.end();
        } else {
            const existedUser = await User.existUser(user.username, user.password);
            const userObj = {
                token: existedUser
            };
            if (existedUser === 'Invalid username!' || existedUser === 'Invalid password!') {
                res.writeHead(400, {'Content-Type': 'text/html'});
                res.write(existedUser);
                console.log(existedUser)
                res.end();
            } else {
                res.setHeader('auth-token', existedUser);
                res.writeHead(200);
                res.write(JSON.stringify(userObj));
                res.end();
            }
        }
    } else {
        if (fullPath.endsWith("/") && method === "get") {
            if (req.headers['auth-token']) {
                try {
                    const verified = jwt.verify(req.headers['auth-token'], process.env.JWT_SECRET);
                    req.user = verified;
                    res.writeHead(200);
                    const values = {
                        id: 'profile',
                        value: 'MY PROFILE',
                        href: 'http://localhost:5001/profile'
                    };
                    res.write(JSON.stringify(values));
                    res.end();
                } catch (err) {
                    res.writeHead(400);
                    const valuesLog = {
                        id: 'button',
                        value: 'LOGIN',
                        href: '#'
                    };
                    res.write(JSON.stringify(valuesLog));
                    res.end();
                    console.log(err);
                }
            } else {
                res.writeHead(401);
                const valuesLog = {
                    id: 'button',
                    value: 'LOGIN',
                    href: '#'
                };
                res.write(JSON.stringify(valuesLog));
                res.end();
            }
        }
    }
};
