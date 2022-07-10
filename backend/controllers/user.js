const User = require('../models/User')

exports.getUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) =>
            res.status(200).json({
                firstName: user.firstName,
                lastName: user.lastName,
                grade: user.grade,
            })
        )
        .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
}
