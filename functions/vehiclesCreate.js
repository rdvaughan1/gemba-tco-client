const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { connectDB } = require('../lib/db');
const Vehicle = require('../models/Vehicle');


exports.handler = async function(event) {
await connectDB();
const vehicleData = JSON.parse(event.body);
const vehicle = new Vehicle(vehicleData);
const created = await vehicle.save();
return {
statusCode: 201,
body: JSON.stringify(created)
};
};
