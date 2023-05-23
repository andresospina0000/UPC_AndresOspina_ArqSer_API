const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.isAuthenticated = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }
            else {
                req.user = decoded.id;
                User.findById(req.user)
                    .then(user => {
                        if (!user) {
                            res.status(404).json({ message: 'Unauthorized: User not found!' })
                        }
                        else {
                            if (!user.active) {
                                res.status(401).json({ message: 'Unauthorized: User not active!' })
                            }
                            else {
                                next();
                            }
                        }
                    })
                    .catch(next)
            }
        });
    }
    else {
        res.status(401).json({ message: 'Unauthorized: Token not found' });
    }
}

module.exports.isActive = (req, res, next) => {

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'Unauthorized: User not found!' })
            }
            else {
                if (!user.active) {
                    res.status(401).json({ message: 'Unauthorized: User not active!' })
                }
                else {
                    next();
                }
            }
        })
        .catch(next)
}