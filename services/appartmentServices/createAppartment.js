const { appartments } = require('../../datasources');
const { getLocationFromLonLat } = require('../../utils/geocoder');
const { convertObjectIdToString } = require('../../utils/mongo');
const { validateAndGetUser } = require('../../utils/validation');

const createAppartment = async ({ input, user }) => {
  const getAndValidateUser = await validateAndGetUser({ user });
  if (!getAndValidateUser.success)
    return {
      success: false,
      message: getAndValidateUser.message,
      statusCode: 401,
    };
  const { name, description, location, numberOfRooms, price, city, country } =
    input;
  const isInputsValid = validateInput({
    name,
    description,
    location,
    numberOfRooms,
    price,
  });
  if (!isInputsValid.success) {
    return {
      success: isInputsValid.success,
      message: isInputsValid.message,
      statusCode: isInputsValid.statusCode,
    };
  }

  let {
    isLocationFetched,
    locationCity,
    locationCountry,
    message,
    statusCode,
  } = await getLocationParams({ location });
  if (!isLocationFetched) {
    return {
      success: isLocationFetched,
      message,
      statusCode,
    };
  }
  const createAppartment = await appartments.createAppartment({
    name: name.toLowerCase(),
    description,
    location,
    numberOfRooms,
    price,
    user: convertObjectIdToString(user.id),
    city: city ? city.toLowerCase() : locationCity.toLowerCase(),
    country: country ? country.toLowerCase() : locationCountry.toLowerCase(),
  });
  if (!createAppartment) {
    return {
      success: false,
      message: 'ERROR_OCCURRED',
      statusCode: 402,
    };
  }
  return {
    success: true,
    message: 'APPARTMENT_CREATED_SUCCESSFULLY',
    statusCode: 200,
    appartment: createAppartment,
  };
};
const validateInput = ({
  name,
  description,
  location,
  numberOfRooms,
  price,
}) => {
  const validateInput =
    name &&
    description &&
    location &&
    location.length !== 0 &&
    numberOfRooms &&
    numberOfRooms > 0 &&
    price &&
    price > 0;
  if (!validateInput)
    return {
      success: false,
      message: 'PARAMS_MISSING',
      statusCode: 400,
    };
  return {
    success: true,
  };
};
const getLocationParams = async ({ location }) => {
  const getLocation = await getLocationFromLonLat({
    lat: location[1],
    lon: location[0],
  });
  if (!getLocation.success) {
    return {
      isLocationFetched: false,
      message: 'WRONG_LOCATION',
      statusCode: 400,
    };
  }
  if (!getLocation.data || getLocation.data.length === 0) {
    return {
      isLocationFetched: false,
      message: 'WRONG_LOCATION',
      statusCode: 400,
    };
  }
  return {
    isLocationFetched: true,
    locationCity: getLocation.data[0].city ? getLocation.data[0].city : null,
    locationCountry: getLocation.data[0].country
      ? getLocation.data[0].country
      : null,
    message: 'LOCATION_FETCHED',
    statusCode: 200,
  };
};
module.exports = { createAppartment };
