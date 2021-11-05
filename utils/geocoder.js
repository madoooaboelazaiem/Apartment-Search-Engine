/* eslint-disable no-console */
let { config } = require('../config');
let nodeGeocoder = require('node-geocoder');

const options = {
  provider: 'locationiq', //locationiq, mapquest , google

  // Optional depending on the providers
  apiKey: config.geolocation, // for Mapquest, OpenCage, Google Premier
};

let geoCoder = nodeGeocoder(options);

const getLocationFromLonLat = async ({ lat, lon }) => {
  return geoCoder
    .reverse({ lat, lon })
    .then((res) => {
      return { success: true, data: res };
    })
    .catch((err) => {
      console.log(err);
      return { success: false, data: {} };
    });
};

module.exports = { getLocationFromLonLat };
