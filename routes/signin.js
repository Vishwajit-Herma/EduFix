const express = require("express");
const USER = require("../models/mongo");
const profile = require("../models/Profile");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const { Jwt_secret } = require("../keys");
const requireLogin = require("../middlewares/requireLogin");


router.post("/signup", (req, res) => {
    
    const { name,  enrollment, password,postBy } = req.body;
    if (!name || !enrollment || !password) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    USER.findOne({ $or: [{ enrollment: enrollment }] }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "User already exist with that enrollment or userName" })
        }
        bcrypt.hash(password, 12).then((hashedPassword) => {
        
            const user = new USER({
                name,
                enrollment,
                password: hashedPassword,
                postBy
            })

            user.save()
                .then(user => { res.json({ message: "Registered successfully" }) })
                .catch(err => { console.log(err) })
        })
    })




})

router.post("/", (req, res) => {
    const { enrollment, password } = req.body;

    if (!enrollment || !password) {
        return res.status(422).json({ error: "Please add enrollment and password" })
    }
    USER.findOne({ enrollment: enrollment }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid enrollment" })
        }
        bcrypt.compare(password, savedUser.password).then((match) => {
            if (match) {
                // return res.status(200).json({ message: "Signed in Successfully" })
                const token = jwt.sign({ _id: savedUser.id }, Jwt_secret)
                const { _id, name, enrollment } = savedUser

                res.json({ token, user: { _id, name, enrollment } })

                console.log({ token, user: { _id, name, enrollment  } })
            } else {
                return res.status(422).json({ error: "Invalid password" })
            }
        })
            .catch(err => console.log(err))
    })
})


module.exports = router;