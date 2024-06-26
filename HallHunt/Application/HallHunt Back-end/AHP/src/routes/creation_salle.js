
const {Salle}= require('../db/sequelize')
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')
const path= require("path")
const multer =require("multer");

const cors= require("cors")



const { Image } = require('../db/sequelize')
const image = require("../models/Images")

 var images = require("../fonctions/enregistrer_images")

 var tab=[]

const uploadDir = path.join(__dirname, './public/data');
//const imagePath = path.join(uploadDir, 'uploads', `${filename}.jpg`);


const  MIME_TYPES={
  "image/jpg" : "jpg",
  "image/jpeg":"jpg",
  "image/gif":"gif",
  "image/png": "png",
  "image/bmp":"bmp",
  "video/mp4" : "mp4"
}


const storage =multer.diskStorage({
  destination : (req,file,cb)=>
  {
     cb(null,"./public/data/uploads/images")
  },
  filename : (req,file,cb)=>{
    const name=file.originalname.split(" ").join("_")
    const extention= MIME_TYPES[file.mimetype]

    

     cb(null, name+ "_"+Date.now()+ "."+extention);
  }
})


 const upload= multer({storage:storage,
  

  }
  )



const salle = require('../models/Salle')


module.exports= (server) => {
   server.post('/api/creation/salle/:id',upload.any('file'),cors(),(req,res)=>{
   
    salle.nom=req.body.nom;
    console.log("niveau_d_accesibilité : "+req.body.niveau)
    salle.niveau_d_accesibilite=req.body.niveau;
    salle.capacite= req.body.capacite;
    salle.prix= req.body.prix;
    salle.description=req.body.description;
    salle.standing= req.body.standing;
    salle.etat=0
    salle.id_utilisateur= req.params.id

   Salle.create(salle)
    .then(salles =>{
        const message ='le Salles a bien ete ajouter.'
      
    
       images.image(req.files,salles.id_salle)

        res.json({message,data: salles})


    }).catch(error => {
     if(error instanceof ValidationError ){
        console.log(error);
     return res.status(400).json({message: error.message,data: error})
    
    }
    if(error instanceof UniqueConstraintError){
     return res.status(400).json({message: error.message})
    }
    const message="la Salles n'a pas pue etre ajouter"

    console.log(error);
    res.status(500).json({message, data:error})
    
 })
 })

    


     
    
}