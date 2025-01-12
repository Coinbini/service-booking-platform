const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  scheduledTime: {
    type: Date,
    required: true
  },
  isASAP: {
    type: Boolean,
    default: false
  },
  location: {
    address: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  price: {
    base: Number,
    discount: Number,
    final: Number
  },
  providerLocation: {
    coordinates: {
      type: [Number],
      default: null
    },
    lastUpdated: Date
  },
  chat: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: String,
    timestamp: Date
  }],
  rating: {
    score: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    timestamp: Date
  }
}, {
  timestamps: true
});

bookingSchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model('Booking', bookingSchema);
