const {Salle}= require('../db/sequelize')
const {Image}= require('../db/sequelize')

const cors=require("cors")
const compare=require("lodash")
const enregistrer_image_video= require("../fonctions/modifier_image_video")
const suppression=require("../fonctions/supprimer_image")
const path= require("path")
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')

var salle =require("../models/Salle")

const multer =require("multer");

var tab=[]
var tab1=[]

const uploadDir = path.join(__dirname, './public/data');
//const imagePath = path.join(uploadDir, 'uploads', `${filename}.jpg`);


const  MIME_TYPES={
 "image/jpg" : "jpg",
 "image/jpeg":"jpg",
 "image/gif":"gif",
 "image/png": "png",
 "image/bmp":"bmp"
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

module.exports =(app) =>{
    app.put('/api/salle/modifier/:id',upload.any('file') , cors(),(req,res) =>
    {
        const id= req.params.id
        tab1= req.files

       /* console.log(req.files)
        if( compare.isEqual(tab1,tab)===false){
           

            Image.findOne( {where: {
                id_salle: req.params.id}}) .then(image=> {
                    if(image===null){
                        const message="l'image n'existe pas, essayer un autre identifiant "
                        return res.status(404).json({message}) 
                    }
                   
                   suppression.supprimer(image.chemin)
                    enregistrer_image_video.modifier(req.files,req.params.id,"undefined")
                   })

                    

              
}
else 
{
    console.log('yo image doit pas etre supprimer')
}
*/


salle= Salle.findOne( {where: {
    id_salle: req.params.id}})

    if( req.body.nom!=="undefined")
    {
        salle.nom=req.body.nom
    } 
    if( req.body.description!=="undefined")
    {
        salle.description=req.body.description
    } 
    if( req.body.standing!=="undefined")
    {
        salle.standing=req.body.standing
    } 
    if( req.body.niveau !=="undefined") 
    {
        salle.niveau_d_accesibilite=req.body.niveau
    } 
    if( req.body.prix !=="undefined")
    {
        salle.prix=req.body.prix
    } 

    if( req.body.capacite !=="undefined")
    {
        salle.capacite=req.body.capacite
    } 


      Salle.update(salle,{
            where: {id_salle: id}

        })
        .then(_=>{
        Salle.findOne( {where: {
            id_salle: req.params.id}}).then(salles => {
                if(salles===null)
                {   const message="le salles n'existe pas "
                        res.status(404).json({message}) 
                    
                }
                const message='le salles a bien ete modifie.'
                res.json({message})
            })
        
        
        }).catch(error =>{
                const message="le salles n'a pas pue etre modifier,reesayer dans quelques instant"
                console.log(error)
                res.status(500).json({message,data: error}) 
               
            }).catch(error => {
                if(error instanceof ValidationError ){
                return res.status(400).json({message: error.message,data: error})
               }
               if(error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message})
               }
               
            })
        })
    }
