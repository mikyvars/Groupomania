const News = require('../models/News')

exports.getNews = (req, res) => {
    News.find()
        .sort({
            posted: -1,
        })
        .limit(5)
        .then((news) => res.status(200).json(news))
        .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
}

exports.addNews = (req, res, next) => {
    console.log(req.body)
    const newsObject = req.body
    const news = new News({
        ...newsObject,
    })

    news.save()
        .then(() => res.status(201).json({ message: 'Votre actualité a bien été envoyée.' }))
        .catch((error) => {
            res.status(500).json({ error })
            console.log(error)
        })
}
