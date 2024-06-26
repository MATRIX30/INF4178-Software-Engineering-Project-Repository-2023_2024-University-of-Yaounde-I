
const {User}= require('../db/sequelize')

const {Adresse}= require('../db/sequelize')

const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')
const utilisateur = require('../models/Users')
const adresse= require('../models/Adresse')
const cors=require("cors")
const bcrypt = require('bcrypt')
var mails= require("../fonctions/email")

var message_rabbit= require("../fonctions/message_enregistrement _utilisateur")


module.exports= (server) =>  {
   server.post('/api/register', cors(),async(req,res)=>{

   var donnee_utilisateur ={id:"",pseudo:"",telephone:"",email:""}
     if(req.body.mot_de_passe ){
      const salt = 10;
      bcrypt.genSalt(salt, function(err, salt) {
         bcrypt.hash(req.body.mot_de_passe, salt, function(err, hash) {
             if (!err) {
                 console.log("Mot de passe crypté : ", hash);
                 utilisateur.mot_de_passe=hash
                 utilisateur.pseudo=req.body.pseudo;
           
                 utilisateur.nom=req.body.nom;
                 utilisateur.email=req.body.email;
                 utilisateur.status= 0;
                 utilisateur.telephone=req.body.telephone
             
                User.create(utilisateur)
                 .then(utilisateurs =>{

                     const message ='le utilisateurs a bien ete ajouter.'
                     mails.send(utilisateur.email,utilisateur.pseudo);

                     //creation de l'adresse de l'utilisateur
                     adresse.id_utilisateur=utilisateurs.id_utilisateur
                     adresse.quartier=req.body.quartier
                     adresse.ville=req.body.ville
                     adresse.region=req.body.region
                     adresse.pays=req.body.pays
                     Adresse.create(adresse)

                  // organisation du messsage qui doit d'etre transfere via rabbitmq
                     donnee_utilisateur.id=utilisateurs.id_utilisateur
                     donnee_utilisateur.email=utilisateurs.email
                     donnee_utilisateur.pseudo= utilisateurs.pseudo
                     donnee_utilisateur.telephone= utilisateurs.telephone
                     message_rabbit.message(donnee_utilisateur);
                     res.json({message,data: utilisateurs})
                 }).catch(error => {
                  if(error instanceof ValidationError ){
                     console.log(error);
                  return res.status(400).json({message: error.message,data: error})
                 
                 }
                 if(error instanceof UniqueConstraintError){
                  return res.status(400).json({message: error.message})
                 }
                 const message="le utilisateurs n'a pas pue etre ajouter"
             
                 console.log(error);
                 res.status(500).json({message, data:error})
                 
              })
                 
             }
         });
     });
      
    }
    
    
   
 })

    


     
    
}