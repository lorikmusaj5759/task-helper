/*
   Name: Complex JavaScript Code Example
   Description: This code demonstrates a complex implementation of a file upload and image processing system.
*/

// Import required libraries
const fs = require('fs');
const sharp = require('sharp');

// Define constants
const UPLOAD_DIR = './uploads';
const OUTPUT_DIR = './processed_images';

// Create required directories if they don't exist
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// List all files in the upload directory
fs.readdir(UPLOAD_DIR, async (err, files) => {
   if (err) {
      console.error('Failed to read upload directory:', err);
      return;
   }

   // Process each file
   for (const file of files) {
      try {
         const filePath = `${UPLOAD_DIR}/${file}`;

         // Check if it's an image file
         const isImage = await checkImageFile(filePath);
         if (!isImage) {
            console.log('Skipping non-image file:', file);
            continue;
         }

         // Resize image
         const processedImagePath = await processImage(file, filePath);

         // Print processed image path
         console.log('Processed image path:', processedImagePath);
      } catch (err) {
         console.error('Failed to process file:', file, '-', err);
      }
   }
});

// Function to check if a file is an image
function checkImageFile(filePath) {
   return new Promise((resolve, reject) => {
      sharp(filePath)
         .metadata()
         .then(metadata => {
            resolve(metadata.hasOwnProperty('width') && metadata.hasOwnProperty('height'));
         })
         .catch(reject);
   });
}

// Function to process an image
function processImage(file, filePath) {
   return new Promise((resolve, reject) => {
      sharp(filePath)
         .resize(800, 600) // Resize to fit maximum dimensions
         .toFile(`${OUTPUT_DIR}/${file}`, (err, info) => {
            if (err) {
               reject(err);
            } else {
               resolve(info.path);
            }
         });
   });
}

// Add more complex functionality, such as file sorting, filtering, or image manipulation options, as needed.

// ... (additional code based on project requirements)

// End of code