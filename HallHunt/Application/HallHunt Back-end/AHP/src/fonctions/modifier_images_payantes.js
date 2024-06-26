const { ImagePayante } = require('../db/sequelize')

module.exports.modifier = async function (file,id) {
let  files

try {
if(file!==null){

   let  hote="https://mighty-basin-23915-3716ff42a384.herokuapp.com/"
    let files= file.map(file=>({path:hote+file.path.replace(/\\/g, "/"),chemin:file.path.replace(/\\/g, "/"),nom:file.filename}));
    for(const items of files){
      await ImagePayante.update ( items,
          {
              where: {
                  id_repertoire:id
              } } )  } }
  
            }
          catch(error){
            const message = "La l'image n'a pas pu être ajoutée";
            console.log(error);
            res.status(500).json({ message, data: error });
          
          
          }
        }