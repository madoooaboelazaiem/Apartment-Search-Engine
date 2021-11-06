const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const appartmentSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
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
    numberOfRooms: {
      type: Number,
    },
    price: {
      type: Number,
    },
    location: {
      type: [Number],
      index: '2dsphere',
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

const AppartmentModel = mongoose.model('Appartment', appartmentSchema);
module.exports = { AppartmentModel };
