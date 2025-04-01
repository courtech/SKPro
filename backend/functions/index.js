const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Health check endpoint
exports.healthCheck = functions.https.onRequest((req, res) => {
  res.json({ status: 'ok', message: 'Firebase Functions are running' });
});

// Example function to get data
exports.getData = functions.https.onRequest(async (req, res) => {
  try {
    res.json({ 
      message: 'This data comes from Firebase Functions',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 