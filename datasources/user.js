const { MongoDataSource } = require('apollo-datasource-mongodb');
const { removeUndefinedKeys } = require('../utils/helper');

class Users extends MongoDataSource {
  async findUser(input) {
    const searchInput = removeUndefinedKeys(input);
    return await this.model.findOne({ ...searchInput }).populate({
      path: 'favorites',
      model: 'Appartment',
      options: { lean: true },
    });
  }

  async userCreation({
    username,
    email,
    passwordHash,
    mobile,
    price,
    location,
    city,
    country,
  }) {
    return await this.model.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      mobile,
      price,
      location,
      passwordHash,
      city,
      country,
    });
  }

  async fetchUsersFavorites({ _id }) {
    return this.model
      .findById(_id)
      .select({ favorites: 1 })
      .populate({
        path: 'favorites',
        populate: {
          path: 'Appartment',
        },
        options: { lean: true },
      })
      .exec();
  }

  async getAllUsers() {
    return this.model
      .find({})
      .populate({
        path: 'preferences',
        populate: {
          path: 'subcategoryTranslation',
          options: {
            sort: { lang: 1 },
          },
        },
      })
      .lean()
      .exec();
  }
  async addAppartmentToFavorites({ _id, appartmentId }) {
    return this.model.updateOne(
      { _id },
      { $addToSet: { favorites: appartmentId } },
    );
  }

  async removeAppartmentFromFavorites({ _id, appartmentId }) {
    return this.model.updateOne(
      { _id },
      { $pull: { favorites: appartmentId } },
    );
  }
}

module.exports = { Users };
