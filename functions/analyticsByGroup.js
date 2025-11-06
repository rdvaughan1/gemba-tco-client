const mongoose = require('mongoose');
const { connectDB } = require('../lib/db');
const Vehicle = require('../models/Vehicle');


exports.handler = async function(event) {
await connectDB();
const url = new URL(event.rawUrl);
const group = url.searchParams.get('group');
const matchStage = group && group !== 'All' ? { group } : {};


const data = await Vehicle.aggregate([
{ $match: matchStage },
{
$group: {
_id: '$group',
totalAcquisition: { $sum: '$acquisitionCost' },
totalUpfitting: { $sum: '$upfittingCost' },
totalFuel: { $sum: '$annualFuelCost' },
totalInsurance: { $sum: '$annualInsuranceCost' },
totalMaintenance: { $sum: '$annualMaintenanceCost' },
avgCostPerYear: {
$avg: {
$divide: [
{
$add: [
'$acquisitionCost',
'$upfittingCost',
{ $multiply: ['$annualFuelCost', '$ageInYears'] },
{ $multiply: ['$annualInsuranceCost', '$ageInYears'] },
{ $multiply: ['$annualMaintenanceCost', '$ageInYears'] }
]
},
'$ageInYears'
]
}
}
}
}
]);


return {
statusCode: 200,
body: JSON.stringify(data)
};
};
