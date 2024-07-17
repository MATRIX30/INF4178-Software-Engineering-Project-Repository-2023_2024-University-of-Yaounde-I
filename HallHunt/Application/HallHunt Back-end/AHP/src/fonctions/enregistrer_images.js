const { Image } = require('../db/sequelize')

module.exports.image = async function (file,id) {

  hote="localhost:3000/"
if(file!==null){
  console.log(id)
  var files = file.map(file => ({ path: hote+file.path.replace(/\\/g, "/"),chemin:file.path.replace(/\\/g, "/"), nom: file.filename, id_salle:id}));
  console.log(  "caracteristique: "+ id)


  await Image.bulkCreate(files)
}

}


