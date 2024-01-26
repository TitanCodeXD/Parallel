require("dotenv").config();
const multer = require("multer");
const path = require("path");
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require("multer-s3");

// Configuração da AWS
const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

//Destination to store image on AWS S3
  const imageStorage = { 
    s3: multerS3({
    s3: s3Client,
    bucket: "paralleluploads", // nome do bucket S3
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read", // Permissões públicas S3
    key: function (req, file, cb) {
      let folder = "";
  
      if (req.baseUrl.includes("users")) {
        folder = "users";
      } else if (req.baseUrl.includes("photos")) {
        folder = "photos";
      }
  
      const filename = Date.now() + path.extname(file.originalname);
      const key = `uploads/${folder}/${filename}`;
      cb(null, key);
    },
  }),
  local: multer.diskStorage({ //Local
destination: function(req, file, cb) {
    let folder = ""
    
    if(req.baseUrl.includes("users")) {
        folder = "users"
    } else if (req.baseUrl.includes("photos")){
        folder = "photos"
    }
    
    cb(null, `uploads/${folder}/`);
},
filename: (req, file, cb) => {
    
    cb(null, Date.now() + path.extname(file.originalname))
}
})
};
  
  const imageUpload = multer({
    storage: imageStorage['s3'],
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/i)) {
        // Upload apenas formatos png e jpg
        return cb(new Error("Por favor, envie apenas png, jpg, ou jpeg."));
      }
      cb(undefined, true);
    },
  });
  
  module.exports = { imageUpload };











  //V2

//   require("dotenv").config();
// const multer = require("multer");
// const path = require("path");
// const aws = require("aws-sdk")
// const multerS3 = require("multer-s3");


// // Configuração da AWS
// aws.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_DEFAULT_REGION,
//     signatureVersion: 'v4',
//   });
  
//   const s3 = new aws.S3();
  
//   // Destination to store image on AWS S3
//   const imageStorage = { 
//     s3: multerS3({
//     s3: s3,
//     bucket: "paralleluploads", // nome do bucket S3
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     acl: "public-read", // Permissões públicas S3
//     key: function (req, file, cb) {
//       let folder = "";
  
//       if (req.baseUrl.includes("users")) {
//         folder = "users";
//       } else if (req.baseUrl.includes("photos")) {
//         folder = "photos";
//       }
  
//       const filename = Date.now() + path.extname(file.originalname);
//       const key = `uploads/${folder}/${filename}`;
//       cb(null, key);
//     },
//   }),
//   local: multer.diskStorage({ //Local
// destination: function(req, file, cb) {
//     let folder = ""
    
//     if(req.baseUrl.includes("users")) {
//         folder = "users"
//     } else if (req.baseUrl.includes("photos")){
//         folder = "photos"
//     }
    
//     cb(null, `uploads/${folder}/`);
// },
// filename: (req, file, cb) => {
    
//     cb(null, Date.now() + path.extname(file.originalname))
// }
// })
// };
  
//   const imageUpload = multer({
//     storage: imageStorage['s3'],
//     fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(png|jpg|jpeg)$/i)) {
//         // Upload apenas formatos png e jpg
//         return cb(new Error("Por favor, envie apenas png ou jpg."));
//       }
//       cb(undefined, true);
//     },
//   });
  
//   module.exports = { imageUpload };




// VERSAO ORIGINAL

// const multer = require("multer");
// const path = require("path");
// const multerS3 = require("multer-s3");

// // Destination to store image
// const imageStorage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         let folder = ""

//         if(req.baseUrl.includes("users")) {
//             folder = "users"
//         } else if (req.baseUrl.includes("photos")){
//             folder = "photos"
//         }

//         cb(null, `uploads/${folder}/`);
//     },
//     filename: (req, file, cb) => {

//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const imageUpload = multer({
//     storage: imageStorage,
//     fileFilter(req, file, cb) {
//         if(!file.originalname.match(/\.(png|jpg|jpeg)$/i)) {

//             // Upload only png and jpg formats
//             return cb(new Error("Por favor, envie apenas png ou jpg."))
//         }
//         cb(undefined, true)
//     }
// })

// module.exports = {imageUpload}