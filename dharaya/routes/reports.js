const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// POST /report - Submit new pollution report
router.post('/report', async (req, res) => {
  try {
    const { category, description, location, latitude, longitude, severity, imageUrl } = req.body;

    if (!category || !description || !location) {
      return res.status(400).json({
        success: false,
        message: 'Category, description, and location are required'
      });
    }

    const newReport = new Report({
      category,
      description,
      location,
      latitude,
      longitude,
      severity: severity || 'medium',
      imageUrl,
      points: Math.floor(Math.random() * 50) + 10 // Random points between 10-60
    });

    await newReport.save();

    res.status(201).json({
      success: true,
      message: 'Report submitted successfully!',
      data: newReport
    });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit report',
      error: error.message
    });
  }
});

// GET /reports - Get all reports with filters
router.get('/reports', async (req, res) => {
  try {
    const { category, status, severity, limit = 100 } = req.query;
    
    let filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (severity) filter.severity = severity;

    const reports = await Report.find(filter).limit(parseInt(limit)).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: reports,
      count: reports.length
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reports',
      error: error.message
    });
  }
});

// GET /reports/:id - Get single report
router.get('/reports/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch report',
      error: error.message
    });
  }
});

// PUT /reports/:id - Update report status
router.put('/reports/:id', async (req, res) => {
  try {
    const { status } = req.body;

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.json({
      success: true,
      message: 'Report updated successfully',
      data: report
    });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update report',
      error: error.message
    });
  }
});

// GET /eco-routes - Get eco-friendly routes
router.get('/eco-routes', (req, res) => {
  try {
    const ecoRoutes = [
      {
        id: 1,
        name: 'Green Park Route',
        distance: '5.2 km',
        duration: '25 mins',
        carbonSaved: '2.3 kg CO2',
        coordinates: [
          { lat: 40.7128, lng: -74.0060 },
          { lat: 40.7200, lng: -74.0000 },
          { lat: 40.7300, lng: -73.9950 }
        ]
      },
      {
        id: 2,
        name: 'Riverside Eco-Path',
        distance: '8.4 km',
        duration: '35 mins',
        carbonSaved: '3.8 kg CO2',
        coordinates: [
          { lat: 40.7350, lng: -73.9850 },
          { lat: 40.7400, lng: -73.9700 },
          { lat: 40.7500, lng: -73.9600 }
        ]
      },
      {
        id: 3,
        name: 'Forest Trail Route',
        distance: '6.8 km',
        duration: '30 mins',
        carbonSaved: '3.1 kg CO2',
        coordinates: [
          { lat: 40.7600, lng: -73.9500 },
          { lat: 40.7650, lng: -73.9400 },
          { lat: 40.7700, lng: -73.9300 }
        ]
      }
    ];

    res.json({
      success: true,
      data: ecoRoutes
    });
  } catch (error) {
    console.error('Error fetching eco-routes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch eco-routes',
      error: error.message
    });
  }
});

// GET /stats - Get statistics
router.get('/stats', async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();
    const byCategory = await Report.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    const byStatus = await Report.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const bySeverity = await Report.aggregate([
      { $group: { _id: '$severity', count: { $sum: 1 } } }
    ]);
    const totalPoints = await Report.aggregate([
      { $group: { _id: null, totalPoints: { $sum: '$points' } } }
    ]);

    res.json({
      success: true,
      data: {
        totalReports,
        byCategory,
        byStatus,
        bySeverity,
        totalPoints: totalPoints[0]?.totalPoints || 0
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

module.exports = router;
