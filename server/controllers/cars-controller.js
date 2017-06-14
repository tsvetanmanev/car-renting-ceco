const Car = require('mongoose').model('Car')
const Renting = require('mongoose').model('Renting')
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
  },
  all: (req, res) => {
    let carsPerPage = 2
    let page = Number.parseInt(req.query.page) || 1
    let search = req.query.search

    let queryCars = Car.find({ isRented: false })
    if (search) {
      queryCars = queryCars.where('make').regex(new RegExp(search, 'i'))
    }

    queryCars
      .sort('-createdOn')
      .skip((page - 1) * carsPerPage)
      .limit(carsPerPage)
      .then(cars => {
        res.render('cars/all', {
          cars: cars,
          hasPrevPage: page > 1,
          hasNextPage: cars.length === carsPerPage,
          prevPage: page - 1,
          nextPage: page + 1,
          search: search
        })
      })
  },
  rent: (req, res) => {
    let userId = req.user._id
    let carId = req.params.id
    let days = parseInt(req.body.days)

    Car.findById(carId)
      .then(car => {
        if (car.isRented) {
          res.locals.globalError = 'Car is already renter'
          res.render('cars/all')
          return
        }

        let totalPrice = car.pricePerDay * days

        Renting.create({
          user: userId,
          car: carId,
          days: days,
          totalPrice: totalPrice
        })
          .then((renting) => {
            car.isRented = true
            car
              .save()
              .then(car => {
                res.redirect('/users/me')
              })
          }).catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        res.locals.globalError = errorHandler.handleMongooseError(err)
        res.render('cars/all')
      })
  }
}
