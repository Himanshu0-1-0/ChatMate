require('dotenv').config();
const AWS = require('aws-sdk');

// Configure AWS with your access and secret key.
const S3_BUCKET = process.env.S3_BUCKET;
const REGION = process.env.AWS_REGION;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: REGION,
});

const s3 = new AWS.S3();

module.exports = { s3, S3_BUCKET };
