const { Users } = require('./user.js');
const { UserModel } = require('../models/user');
const { Appartments } = require('./appartment.js');
const { AppartmentModel } = require('../models/appartment');

const users = new Users(UserModel);
const appartments = new Appartments(AppartmentModel);

module.exports = { users, appartments };
