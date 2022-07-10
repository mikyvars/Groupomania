const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
        const userId = decodedToken.userId

        User.findOne({ _id: userId })
            .then((user) => {
                if (user.grade === 'admin') {
                    next()
                } else {
                    res.status(401).json({ message: "Vous n'avez pas accès à cette fonctionnalité." })
                }
            })
            .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
    } catch (error) {
        res.status(401).json({ error: 'Vous devez être connecté pour effectuer cette requête.' })
    }
}
