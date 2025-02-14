const multer = require('multer')
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  function fileFilter (req, file, cb) {

    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/pjpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'image/bmp'
    ]
  
    // Allow only images
    
    if(!allowedMimes.includes(file.mimetype)){
      return cb(new Error('Invalid file type'))
    }
    else{
      cb(null, true)
    }
  
  }
  const upload = multer({ storage: storage , fileFilter:fileFilter})

  module.exports = upload