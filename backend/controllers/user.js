const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.signup = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((exists) => {
            if (exists) {
                return res.status(409).json({ message: 'Cette addresse e-mail est déjà utilisée.' })
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
                        .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
                })
                .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
        })
        .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "Aucun compte n'est associé avec cette addresse e-mail." })
            }

            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect.' })
                    }

                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN || 'SECRET_TOKEN', { expiresIn: '7d' }),
                    })
                })
                .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
        })
        .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
}
