const express = require("express");
const bcrypt = require("bcrypt");
const jwtMiddleware = require("../config/jwt-middleware");
const JWT = require("jsonwebtoken");
const jwtConfig = require("../config/jwt-config");
const userModel = require("../models").User;
const router = express();

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Sign Up
router.post("/signup", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    userModel
        .findOne({
            where: {
                email: {
                    [Op.eq]: email,
                },
            },
        })
        .then((user) => {
            if (user) {
                // we have user available
                res.status(200).json({
                    status: true,
                    message: "User already exists with this email address",
                });
            } else {
                // create new user
                userModel
                    .create({
                        email: email,
                        password: bcrypt.hashSync(password, 10),
                    })
                    .then((user) => {
                        res.status(200).json({
                            status: true,
                            message: "User created successfully",
                        });
                    });
            }
        })
        .catch();
});


// Създайте масив за съхранение на извършените обновления
const tokenRefreshCounts = new Map();

// Sign In
router.post("/signin", (req, res) => {

    let email = req.body.email;
    userModel.findOne({
        where: {
            email: {
                [Op.eq]: email
            }
        }
    }).then((user) => {
        if (user) {
            let password = req.body.password;
            if (bcrypt.compareSync(password, user.password)) {
                // Генериране на основен токен
                let token = JWT.sign({
                    id: user.id,
                    role: user.role,
                }, jwtConfig.secret, {
                    expiresIn: jwtConfig.expiresIn, notBefore: jwtConfig.notBefore
                });

                // Генериране на refresh токен
                const refreshToken = JWT.sign({ id: user.id, role: user.role }, jwtConfig.refreshSecret, {
                    expiresIn: jwtConfig.refreshExpiresIn,
                });

                res.status(200).json({
                    status: true,
                    message: "Login successful",
                    token: token,
                    refreshToken: refreshToken,
                });
                // При успешно вписване
                // res.status(200).render('dashboard', {
                //     message: 'Login successful',
                //     token: token,
                //     refreshToken: refreshToken
                // });


                // Инициализирайте брояч за обновления на токена
                tokenRefreshCounts.set(user.id, 0);

                // Пренасочване към /dashboard след  успешно вписване
                // res.redirect("/dashboard");

            } else {
                res.status(500).json({
                    status: false,
                    message: "Password did not match",
                });
            }
        } else {
            // Няма Employee с този имейл адрес
            res.status(500).json({
                status: false,
                message: "Employee does not exist with this email",
            });
        }
    }).catch();
});



module.exports = router;
