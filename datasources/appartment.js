const { MongoDataSource } = require('apollo-datasource-mongodb');
const { removeUndefinedKeys, checkIfKeyExists } = require('../utils/helper');

class Appartments extends MongoDataSource {
  async findAppartment(input) {
    const searchInput = removeUndefinedKeys(input);
    return await this.model.findOne({ ...searchInput }).populate({
      path: 'user',
      populate: {
        path: 'User',
      },
      options: { lean: true },
    });
  }
  async createAppartment({
    name,
    description,
    location,
    numberOfRooms,
    price,
    user,
    city,
    country,
  }) {
    return await this.model.create({
      name,
      description,
      location,
      numberOfRooms,
      price,
      user,
      city,
      country,
    });
  }

  async updateLocation(location, _id) {
    return this.model.findOneAndUpdate(
      { _id },
      { ...location },
      {
        new: true,
      },
    );
  }

  async getAllAppartments() {
    return this.model
      .find({})
      .populate({
        path: 'user',
        populate: {
          path: 'User',
        },
        options: { lean: true },
      })
      .lean()
      .exec();
  }
  async getUsersAppartments({ user }) {
    return this.model
      .find({ user })
      .populate({
        path: 'user',
        populate: {
          path: 'User',
        },
        options: { lean: true },
      })
      .lean()
      .exec();
  }

  async searchForAppartmentsByName({ searchInput }) {
    return this.model
      .find({
        $elemMatch: {
          name: {
            $regex: '.*' + searchInput + '.*',
            $options: 'i',
          },
        },
      })
      .populate({
        path: 'user',
        populate: {
          path: 'User',
        },
        options: { lean: true },
      })
      .lean()
      .exec();
  }

  async appartmentFilterSortByDistance({
    searchQuery,
    filterArgs,
    maxDistance,
    location,
  }) {
    return this.model
      .find({
        $and: [
          searchQuery,
          {
            location: {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates:
                    location && location.length === 2
                      ? [location[0], location[1]] // [1] is long , [0] is lat
                      : [6.953101, 50.935173], // Longitude , Latitude of Cologne by default
                },
                $minDistance: 0,
                $maxDistance: maxDistance, // in meters by default
              },
            },
          },
          filterArgs,
        ],
      })
      .populate({
        path: 'user',
        populate: {
          path: 'User',
        },
        options: { lean: true },
      })
      .lean()
      .exec();
  }
  async appartmentFilter({ searchQuery, filterArgs }) {
    return this.model
      .find({
        $and: [searchQuery, filterArgs],
      })
      .populate({
        path: 'user',
        populate: {
          path: 'User',
        },
        options: { lean: true },
      })
      .lean()
      .exec();
  }

  async filterAppartments({ searchInput, filterInputs, location }) {
    let filterArgs = {};
    filterInputs && checkIfKeyExists({ object: filterInputs, key: 'city' })
      ? (filterArgs.city = filterInputs.city)
      : filterArgs;
    filterInputs && checkIfKeyExists({ object: filterInputs, key: 'country' })
      ? (filterArgs.country = filterInputs.country)
      : filterArgs;
    let searchQuery = {};
    if (searchInput && searchInput.length !== 0) {
      searchQuery = {
        name: {
          $regex: '.*' + searchInput + '.*',
          $options: 'i',
        },
      };
    }
    if (
      filterInputs &&
      checkIfKeyExists({ object: filterInputs, key: 'maxDistance' }) &&
      parseFloat(filterInputs.maxDistance) >= 0
    ) {
      return await this.appartmentFilterSortByDistance({
        searchQuery,
        searchInput,
        filterArgs,
        maxDistance:
          filterInputs.maxDistance && filterInputs.maxDistance !== 0
            ? parseFloat(filterInputs.maxDistance) * 1000 // change to meter
            : 1000000,
        location,
      });
    } else {
      return await this.appartmentFilter({
        searchQuery,
        searchInput,
        filterArgs,
      });
    }
  }
}

module.exports = { Appartments };
