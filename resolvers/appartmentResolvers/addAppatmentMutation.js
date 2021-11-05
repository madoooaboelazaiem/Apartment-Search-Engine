const AppartmentService = require('../../services/appartmentServices');

const addAppartmentMutation = async (_, { input }, { user }) => {
  return await AppartmentService.createAppartment({ input, user });
};

module.exports = { addAppartmentMutation };
