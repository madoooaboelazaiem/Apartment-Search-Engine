const { appartments } = require('../../datasources');
const { paginateData } = require('../../utils/pagination');
const { validateAndGetUser } = require('../../utils/validation');

const searchAndFilterAppartments = async (
  _,
  { searchInput, filterInputs, after, before, first, last },
  { user },
) => {
  const getAndValidateUser = await validateAndGetUser({ user });
  if (!getAndValidateUser.success)
    return {
      success: false,
      message: getAndValidateUser.message,
    };
  const location = getAndValidateUser.user.location;
  const isInputsValid = validateInput({
    searchInput,
    filterInputs,
    location,
  });
  if (!isInputsValid.success) {
    return {
      success: isInputsValid.success,
      message: isInputsValid.message,
      statusCode: isInputsValid.statusCode,
    };
  }
  const searchAndFilterResponse = await appartments.filterAppartments({
    searchInput,
    filterInputs,
    location: location,
  });
  if (searchAndFilterResponse && searchAndFilterResponse.length !== 0) {
    const { nodes, edges, pageInfo, totalCount } = paginateData({
      data: searchAndFilterResponse,
      after,
      before,
      first,
      last,
    });

    return {
      success: true,
      message: 'APPARTMENTS_FETCHED_SUCCESSFULLY',
      nodes,
      edges,
      pageInfo,
      totalCount,
      statusCode: 200,
    };
  }
  return {
    success: true,
    message: 'NO_APPARTMENTS_FOUND',
    nodes: [],
    edges: [],
    pageInfo: null,
    totalCount: 0,
    statusCode: 200,
  };
};
const validateInput = ({ filterInputs, searchInput, location }) => {
  const validateSearchInput = searchInput && searchInput.length !== 0;
  if (
    !validateSearchInput &&
    (!filterInputs || Object.keys(filterInputs).length === 0)
  ) {
    return {
      success: false,
      message: 'PARAMS_MISSING',
      statusCode: 400,
    };
  }
  if (filterInputs) {
    const validateLocation = location && location.length !== 0;
    const validateInputDistance =
      filterInputs && filterInputs.maxDistance && filterInputs.maxDistance < 0;
    if (validateInputDistance) {
      return {
        success: false,
        message: 'MAXDISTANCE_INVALID',
        statusCode: 400,
      };
    }
    if (filterInputs && filterInputs.maxDistance && !validateLocation) {
      return {
        success: false,
        message: 'USER_LOCATION_MISSING',
        statusCode: 400,
      };
    }
    const validateCity =
      filterInputs && filterInputs.city && filterInputs.city.length !== 0;
    if (!validateCity && filterInputs.city) {
      return {
        success: false,
        message: 'CITY_CANNOT_BE_EMPTY',
        statusCode: 400,
      };
    }
    const validateCountry =
      filterInputs && filterInputs.country && filterInputs.country.length !== 0;
    if (!validateCountry && filterInputs.country) {
      return {
        success: false,
        message: 'COUNTRY_CANNOT_BE_EMPTY',
        statusCode: 400,
      };
    }
    const validateNumberOfRooms =
      filterInputs &&
      filterInputs.numberOfRooms &&
      filterInputs.numberOfRooms > 0;
    if (!validateNumberOfRooms && filterInputs.numberOfRooms) {
      return {
        success: false,
        message: 'NUMBER_OF_ROOMS_INVALID',
        statusCode: 400,
      };
    }
  }
  return {
    success: true,
  };
};
module.exports = { searchAndFilterAppartments };
