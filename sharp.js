const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDirectory = path.resolve(__dirname, 'src/public/images/');
const destinationDirectory = path.resolve(__dirname, 'dist/images');

if (!fs.existsSync(destinationDirectory)) {
  fs.mkdirSync(destinationDirectory, { recursive: true });
}

// Rekursif memproses seluruh gambar di dalam folder sourceDirectory
processImages(sourceDirectory);

function processImages (directory) {
  fs.readdirSync(directory).forEach(item => {
    const itemPath = path.resolve(directory, item);

    if (fs.lstatSync(itemPath).isDirectory()) {
      // Jika item adalah folder, rekursif memproses folder tersebut
      processImages(itemPath);
    } else if (fs.lstatSync(itemPath).isFile() && isImageFile(item)) {
      try {
        // Mengecek ekstensi file untuk menentukan format output
        const ext = path.extname(item).toLowerCase();
        let outputFormat = ext === '.png' ? 'png' : 'jpg';

        sharp(itemPath)
          .resize(800)
          .toFormat(outputFormat)
          .toFile(path.resolve(destinationDirectory, `${path.parse(item).name}-large.${outputFormat}`))
          .then(info => console.log(`Successfully processed ${item} to large version`))
          .catch(err => console.error(`Error processing ${item}: ${err}`));

        sharp(itemPath)
          .resize(480)
          .toFormat(outputFormat)
          .toFile(path.resolve(destinationDirectory, `${path.parse(item).name}-small.${outputFormat}`))
          .then(info => console.log(`Successfully processed ${item} to small version`))
          .catch(err => console.error(`Error processing ${item}: ${err}`));
      } catch (err) {
        console.error(`Error reading file ${item}: ${err}`);
      }
    } else {
      console.error(`${item} is not a valid image file or should not be resized`);
    }
  });
}

function isImageFile (file) {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const ext = path.extname(file).toLowerCase();
  return validExtensions.includes(ext);
}
