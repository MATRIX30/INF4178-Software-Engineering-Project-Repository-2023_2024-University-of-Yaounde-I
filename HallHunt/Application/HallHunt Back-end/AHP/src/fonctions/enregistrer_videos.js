const {Videos_upload } = require('../db/sequelize')





module.exports.Video_p = async function (file,id) {


  try {
  hote="https://mighty-basin-23915-3716ff42a384.herokuapp.com/"
 
  var files = file.map(file => ({ path:hote+file.path.replace(/\\/g, "/"),chemin:file.path.replace(/\\/g, "/"), nom: file.originalname, id_repertoire:id}));

  await Videos_upload.bulkCreate(files)

}

catch(error){
  const message = "La la video n'a pas pu être ajoutée";
  console.log(error);
  res.status(500).json({ message, data: error });

}
}


