const { users } = require('../../datasources');
const { getLocationFromLonLat } = require('../../utils/geocoder');
const { getPasswordHash } = require('../../utils/password');

const registerUser = async ({ input }) => {
  if (!input) {
    return {
      success: false,
      message: 'PARAMS_MISSING',
      user: null,
      statusCode: 400,
    };
  }
  const {
    username,
    email,
    mobile,
    password,
    confirmPassword,
    location,
    city,
    country,
  } = input;
  const accountInputValidation =
    username &&
    email &&
    mobile &&
    password &&
    confirmPassword &&
    location &&
    location.length !== 0;
  if (!accountInputValidation) {
    return {
      success: false,
      message: 'PARAMS_MISSING',
      user: null,
      statusCode: 400,
    };
  }
  if (location.length !== 2) {
    return {
      success: false,
      message: 'WRONG_LOCATION',
      user: null,
      statusCode: 400,
    };
  }
  const isEmailExisting = await users.findUser({ email });
  if (isEmailExisting) {
    return {
      success: false,
      message: 'ACCOUNT_EXISTS',
      user: null,
      statusCode: 400,
    };
  }
  const isUsernameExisting = await users.findUser({ username });
  if (isUsernameExisting) {
    return {
      success: false,
      message: 'ACCOUNT_EXISTS',
      user: null,
      statusCode: 400,
    };
  }
  const isMobileExisting = await users.findUser({ mobile });
  if (isMobileExisting) {
    return {
      success: false,
      message: 'ACCOUNT_EXISTS',
      user: null,
      statusCode: 400,
    };
  }
  if (password !== confirmPassword) {
    return {
      success: false,
      message: 'PASSWORD_MISMATCH',
      user: null,
      statusCode: 400,
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
  const passwordHash = await getPasswordHash({ password });
  const createUser = await users.userCreation({
    username,
    email,
    mobile,
    passwordHash,
    location,
    city: city ? city.toLowerCase() : locationCity.toLowerCase(),
    country: country ? country.toLowerCase() : locationCountry.toLowerCase(),
  });
  if (!createUser) {
    return {
      success: false,
      message: 'ERROR_OCCURRED',
      user: null,
      statusCode: 402,
    };
  }
  return {
    success: true,
    message: 'USER_CREATED_SUCCESSFULLY',
    user: createUser,
    statusCode: 201,
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
module.exports = { registerUser };
