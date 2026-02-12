const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'images');
const outputDir = path.join(__dirname, 'images');

if (!fs.existsSync(inputDir)) {
    console.error('Input directory "images" does not exist.');
    process.exit(1);
}

const sizes = [
    { name: 'thumbnail', width: 300 },
    { name: 'medium', width: 800 }
];

fs.readdir(inputDir, (err, files) => {
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    }

    files.forEach(file => {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const inputFile = path.join(inputDir, file);
            const fileName = path.parse(file).name;

            // Convert original to WebP
            sharp(inputFile)
                .toFormat('webp')
                .toFile(path.join(outputDir, `${fileName}.webp`))
                .then(info => console.log(`Processed ${fileName}.webp`))
                .catch(err => console.error(`Error processing ${file}:`, err));

            // Generate resized versions
            sizes.forEach(size => {
                sharp(inputFile)
                    .resize(size.width)
                    .toFormat('webp')
                    .toFile(path.join(outputDir, `${fileName}-${size.name}.webp`))
                    .then(info => console.log(`Processed ${fileName}-${size.name}.webp`))
                    .catch(err => console.error(`Error processing ${fileName}-${size.name}.webp:`, err));
            });
        }
    });
});
