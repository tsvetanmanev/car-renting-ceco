const mongoose = require('mongoose')

let carSchema = new mongoose.Schema({
  make: {type: String, required: true},
  model: {type: String, required: true},
  year: {type: Number, required: true},
  pricePerDay: {type: Number, required: true, min: 0.01},
  power: {type: Number},
  image: {type: String, required: true}
})

let Car = mongoose.model('Car', carSchema)

module.exports = Car
