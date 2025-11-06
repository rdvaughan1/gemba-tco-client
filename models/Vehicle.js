const mongoose = require('mongoose');


const VehicleSchema = new mongoose.Schema({
acquisitionCost: Number,
upfittingCost: Number,
annualFuelCost: Number,
annualInsuranceCost: Number,
annualMaintenanceCost: Number,
ageInYears: Number,
mileage: Number,
estimatedResaleValue: Number,
group: { type: String, default: 'Ungrouped' },
dateCreated: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Vehicle', VehicleSchema);
