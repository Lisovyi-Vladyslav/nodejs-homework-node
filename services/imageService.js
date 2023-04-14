const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const fse = require('fs-extra');
const Jimp = require("jimp");


const { AppError } = require('../utils');

class ImageService {
  static upload(name) {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, callbackFn) => {
      // 'image/cdhjsakcbjsda' 'document/dbhsajvds'

      if (file.mimetype.startsWith('image')) {
        callbackFn(null, true);
      } else {
        callbackFn(new AppError(400, 'Upload images only..'), false);
      }
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(name);
  }

  static async save(file, ...pathSegments) {
    const fileName = `${uuid()}.jpeg`;
    const fullFilePath = path.join(process.cwd(), 'public', ...pathSegments);

    await fse.ensureDir(fullFilePath);
    await Jimp.read(file.buffer)
    .then((img) => {
    return img
      .resize(250, 250) // resize
      .quality(80) // set JPEG quality
      .write(path.join(fullFilePath, fileName)); // save
  })
  .catch((err) => {
    console.error(err);
  });
      

    return path.join(...pathSegments, fileName);
  }
}

module.exports = ImageService;

// .resize(options || { heigh: 500, width: 500 })
//       .toFormat('jpeg')
//       .jpeg({ quality: 90 })
//       .toFile(path.join(fullFilePath, fileName));
