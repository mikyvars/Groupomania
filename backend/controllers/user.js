const bcrypt = require('bcrypt')
const jsw = require('jsonwebtoken')
const User = require('../models/User')

exports.signup = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((exists) => {
            if (exists) {
                res.status(409).json({ error: 'Cette addresse e-mail est déjà utilisée.' })
                return
            }

            bcrypt
                .hash(req.body.password, 10)
                .then((hash) => {
                    const user = new User({
                        ...req.body,
                        password: hash,
                    })

                    user.save()
                        .then(() => res.status(201).json({ message: 'Inscription réussie avec succès.' }))
                        .catch((error) => res.status(500).json({ error: '' }))
                })
                .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
        })
        .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
}

exports.login = (req, res, next) => {}
