const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.create = (req, res, next) => {
    User.create(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio,
        }
    )
        .then(user => res.status(201).json(
            {
                message: 'User created successfully, please open the Activate User Url to activate your account!',
                activateUserUrl: `http://localhost:8000/api/users/${user._id}/validate`
            }))
        .catch(next)
};

module.exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'User not found!' })
            }
            else {
                return user.verifyPassword(req.body.password)
                    .then(match => {
                        if (!match) {
                            res.status(401).json({ message: 'Invalid credentials' });
                        }
                        else {
                            res.json({
                                token: jwt.sign(
                                    {
                                        id: user._id,
                                    },
                                    process.env.JWT_SECRET,
                                    {
                                        expiresIn: 240
                                    }
                                )
                            });
                        }
                    })
            }
        })
        .catch(next)
};

module.exports.validate = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'User not found!' })
            }
            else {
                user.active = true;
                User.findByIdAndUpdate(req.params.id, user)
                    .then(() => res.status(200).json({ message: 'User activated successfully!' }))
                    .catch(next)
            }
        })
        .catch(next)
}