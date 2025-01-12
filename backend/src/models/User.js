const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['client', 'provider', 'admin'],
    default: 'client'
  },
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    avatar: String,
    address: String
  },
  providerProfile: {
    services: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    }],
    rating: {
      average: {
        type: Number,
        default: 0
      },
      count: {
        type: Number,
        default: 0
      }
    },
    availability: {
      type: [{
        day: {
          type: String,
          enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        },
        slots: [{
          startTime: String,
          endTime: String
        }]
      }],
      default: []
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    serviceArea: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      },
      radius: {
        type: Number, // in kilometers
        default: 10
      }
    }
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.index({ "providerProfile.serviceArea": "2dsphere" });

module.exports = mongoose.model('User', userSchema);
