// import IpfsHttpClient from 'ipfs-http-client';
// const ipfs = new IpfsHttpClient({ host: 'ipfs.infura.io', port: 5001 });

// const fileContents = await readFileAsBuffer('my-file.txt');
// const result = await ipfs.add(fileContents);

// // FOR REFRENCE CODE

// const ipfsClient = require('ipfs-http-client');
// const crypto = require('crypto');
// const fs = require('fs');

// // IPFS endpoint
// const ipfs = ipfsClient('http://localhost:5001'); // Use the correct IPFS API endpoint

// // Replace with your private key and passphrase
// const privateKey = '1234'; // Replace with your actual private key
// const passphrase = 'your_passphrase'; // Replace with your actual passphrase

// // Path to the image you want to upload
// const imagePath = 'path/to/your/image.jpg';

// // Function to encrypt the image
// function encryptImage(imageContent) {
//   // Generate a random initialization vector (IV)
//   const iv = crypto.randomBytes(16);

//   // Create a cipher to encrypt the image with your private key
//   const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(privateKey), iv);

//   // Encrypt the image content
//   const encryptedImage = Buffer.concat([iv, cipher.update(imageContent), cipher.final()]);

//   return encryptedImage;
// }

// // Function to decrypt the image
// function decryptImage(encryptedImage) {
//   // Extract the IV from the encrypted image
//   const iv = encryptedImage.slice(0, 16);

//   // Create a decipher to decrypt the image with your private key
//   const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(privateKey), iv);

//   // Decrypt the image content
//   const decryptedImage = Buffer.concat([decipher.update(encryptedImage.slice(16)), decipher.final()]);

//   return decryptedImage;
// }

// // Upload the encrypted image to IPFS
// async function uploadEncryptedImage() {
//   try {
//     // Read the image file
//     const imageContent = fs.readFileSync(imagePath);

//     // Encrypt the image
//     const encryptedImage = encryptImage(imageContent);

//     // Upload the encrypted image to IPFS
//     const result = await ipfs.add(encryptedImage);
//     console.log('Encrypted image uploaded to IPFS with CID:', result.cid.toString());
//     return result.cid.toString(); // Return the CID (Content Identifier) of the uploaded file
//   } catch (error) {
//     console.error('Error uploading encrypted image to IPFS:', error);
//     throw error;
//   }
// }

// // Retrieve and decrypt the image from IPFS
// async function retrieveAndDecryptImage(cid) {
//   try {
//     // Retrieve the encrypted image from IPFS
//     const response = await ipfs.cat(cid);
//     const encryptedImage = await response.read();

//     // Decrypt the image
//     const decryptedImage = decryptImage(encryptedImage);

//     // Save the decrypted image to a file or display it
//     fs.writeFileSync('decrypted_image.jpg', decryptedImage);
//     console.log('Decrypted image saved to decrypted_image.jpg');
//   } catch (error) {
//     console.error('Error retrieving or decrypting image from IPFS:', error);
//     throw error;
//   }
// }

// // Upload the encrypted image to IPFS
// uploadEncryptedImage()
//   .then((cid) => {
//     // Retrieve and decrypt the image from IPFS
//     retrieveAndDecryptImage(cid)
//       .catch((error) => {
//         // Handle errors
//       });
//   })
//   .catch((error) => {
//     // Handle errors
//   });
