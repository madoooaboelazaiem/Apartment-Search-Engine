const { users, appartments } = require('../../datasources');
const { validateAndGetUser } = require('../../utils/validation');

const addToFavorites = async ({ input, user }) => {
  const getAndValidateUser = await validateAndGetUser({ user });
  if (!getAndValidateUser.success)
    return {
      success: false,
      message: getAndValidateUser.message,
      statusCode: 401,
    };
  const validateInput = input && input.appartmentId;
  if (!validateInput)
    return {
      success: false,
      message: 'INVALID_INPUT',
      statusCode: 400,
    };
  const isAppartmentExisting = await appartments.findAppartment({
    _id: input.appartmentId,
  });
  if (!isAppartmentExisting)
    return {
      success: false,
      message: 'INVALID_INPUT',
      statusCode: 400,
    };
  await users.addAppartmentToFavorites({
    _id: user.id,
    appartmentId: input.appartmentId,
  });
  return {
    success: true,
    message: 'APPARTMENT_ADDED_TO_Favorites_SUCCESSFULLY',
    statusCode: 201,
  };
};

module.exports = { addToFavorites };
