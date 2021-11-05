const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    passwordHash: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    location: {
      type: [Number],
      index: '2dsphere',
      required: true,
    },
    favorites: [
      {
        type: Types.ObjectId,
        ref: 'Appartment',
      },
    ],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

const UserModel = mongoose.model('User', userSchema);
module.exports = { UserModel };
