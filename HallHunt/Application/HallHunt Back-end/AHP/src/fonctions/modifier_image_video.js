const { Image } = require('../db/sequelize')

const { Video } = require('../db/sequelize')
/*
const image = require("../models/Images")
const video = require("../models/Videos")
*/


module.exports.modifier = async function (file,id, url) {

  let files
  try {
if(file!==null){
 let  hote="https://mighty-basin-23915-3716ff42a384.herokuapp.com/"
  let  files= file.map(file=>({path:hote+file.path.replace(/\\/g, "/"),chemin:file.path.replace(/\\/g, "/"),nom:file.filename}));
  for(const items of files){
    await Image.update ( items,
        {
            where: {
                id_formation:id
            }
        }
    )
  }
}
  if ((url !=="undefined")
  ) {
    video.path = url
    video.id_formation = id
   await  Video.update(video,
      {
          where: {
              id_formation:id
          }
      }
  )
  }

}
catch(error){
  const message = "La l'image n'a pas pu être ajoutée";
  console.log(error);
  res.status(500).json({ message, data: error });

}
}


