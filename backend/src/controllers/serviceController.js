const Service = require('../models/Service');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configure AWS
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadToS3 = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `services/${Date.now()}-${path.basename(file.originalname)}`,
    Body: fileStream
  };

  const result = await s3.upload(uploadParams).promise();
  // Clean up local file
  fs.unlinkSync(file.path);
  return result.Location;
};

exports.getAllServices = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort } = req.query;
    let query = { isActive: true };

    // Apply filters
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Build sort object
    let sortObj = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortObj[field] = order === 'desc' ? -1 : 1;
    }

    const services = await Service.find(query).sort(sortObj);
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const serviceData = req.body;
    
    // Upload images if provided
    if (req.files && req.files.length > 0) {
      const imageUrls = await Promise.all(
        req.files.map(file => uploadToS3(file))
      );
      serviceData.images = imageUrls;
    }

    const service = new Service(serviceData);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const updates = req.body;
    
    // Handle image uploads
    if (req.files && req.files.length > 0) {
      const imageUrls = await Promise.all(
        req.files.map(file => uploadToS3(file))
      );
      updates.images = imageUrls;
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};

exports.addPromotion = async (req, res) => {
  try {
    const { discountPercentage, validUntil } = req.body;
    
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        promotion: {
          isActive: true,
          discountPercentage,
          validUntil: new Date(validUntil)
        }
      },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error adding promotion', error: error.message });
  }
};

exports.removePromotion = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        promotion: {
          isActive: false,
          discountPercentage: 0,
          validUntil: null
        }
      },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error removing promotion', error: error.message });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { availability },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error updating availability', error: error.message });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service.availability);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching availability', error: error.message });
  }
};
