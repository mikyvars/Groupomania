const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
        const userId = decodedToken.userId
        req.auth = { userId }

        if (req.body.userId && req.body.userId !== userId) {
            throw "Votre identifiant n'est pas valable."
        } else {
            next()
        }
    } catch (error) {
        res.status(401).json({ error: 'Vous devez être connecté pour effectuer cette requête.' })
    }
}
