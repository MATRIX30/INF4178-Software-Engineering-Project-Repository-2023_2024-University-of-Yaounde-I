
const {Salle,User,Demande_reservation}= require('../db/sequelize')
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')

const cors= require("cors")

var demande_reservation= require("../models/Demande_reservation")

module.exports= (server) => {
   server.post('/api/demande/reservation/:id_client',cors(),async(req,res)=>{
  try{ 
  
    demande_reservation.id_client= req.params.id_client
    demande_reservation.id_proprietaire= req.body.id_utilisateur
    demande_reservation.nom_salle= req.body.nom
    demande_reservation.date_debut= req.body.date_debut
    demande_reservation.duree= req.body.duree



    Demande_reservation.create(demande_reservation)
    .then(demande_reservations=>{
       
        res.json({demande_reservations})
    })
}
    catch (error) {
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
    
 }
 }
 )}
