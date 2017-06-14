const Car = require('mongoose').model('Car')
const errorHandler = require('../utilities/error-handler')

module.exports = {
  addGet: (req, res) => {
    res.render('cars/add')
  },
  addPost: (req, res) => {
    let carReq = req.body

    if (carReq.pricePerDay <= 0) {
      res.locals.globalError = 'Price per day cannot be zero or less'
      res.render('cars/add', carReq)
      return
    }

    Car
      .create({
        make: carReq.make,
        model: carReq.model,
        year: carReq.year,
        pricePerDay: carReq.pricePerDay,
        power: carReq.power,
        image: carReq.image
      })
      .then(car => {
        res.redirect('/cars/all')
      })
      .catch(err => {
        res.locals.globalError = errorHandler.handleMongooseError(err)
        res.render('cars/add', carReq)
      })
  }
}
