
const {Reservation,Demande_reservation,User,Salle}= require('../db/sequelize')
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')

const cors= require("cors")
const mail_confirmation= require("../fonctions/email")
const mail_refus= require("../fonctions/email_refus")

var reservation = require('../models/Reservation')

var salle= require("../models/Salle")
var client = require('../models/Users')

var proprietaire = require('../models/Users')

var fin =require ("../fonctions/miniteur_reservation_fin")
var   demande_reservation = require('../models/Demande_reservation')


module.exports= (server) => {
   server.post('/api/creation/reservation/:id_demande_reservation',cors(),async(req,res)=>{
   
    try{
    reservation.id_demande_reservation=req.params.id_demande_reservation;
     var message=""
     demande_reservation=  await Demande_reservation.findOne({where: { id_demande_reservation: req.params.id_demande_reservation}})
     client = await User.findOne({where: { id_utilisateur: demande_reservation.id_client}})
     proprietaire=  await User.findOne({where: { id_utilisateur: demande_reservation.id_proprietaire}})
     salle=  await Salle.findOne({where: { nom: demande_reservation.nom_salle}})
   
if(req.body.reponse=="oui")
{
    Reservation.create(reservation)
 
  let  date_fin= demande_reservation.date_debut.setMinutes(demande_reservation.date_debut.getMinutes()+ demande_reservation.duree);
    console.log(date_fin)
    fin.miniteur_fin(salle,date_fin)
   


   // mail_confirmation.send(client.pseudo,salle.nom,demande_reservation.date_debut,demande_reservation.duree,client.email,proprietaire.pseudo)
    salle.etat= 1;

     Salle.update({etat:1},{ where: {id_salle:salle.id_salle}})
   message="la salle a bien etet reserver "

   Demande_reservation.findOne({ where: {
    id_demande_reservation: req.params.id_demande_reservation}}
 )
.then(demande_reservations => {
    if(demande_reservations===null){
        const message="le Salles n'existe pas, essayer un autre identifiant "
        return res.status(404).json({message}) 
    }

   mail_refus.send(client.pseudo,client.email)

   //
    const demande_resevationsdelete=demande_reservations;
    demande_reservations.destroy({
        where :  id_demande_reservation=demande_reservations.id_demande_reservation
    }).then()

        
})

}
else{

    message="la reservation a ete refuser "
    Demande_reservation.findOne({ where: {
        id_demande_reservation: req.params.id_demande_reservation}}
     )
    .then(demande_reservations => {
        if(demande_reservations===null){
            const message="le Salles n'existe pas, essayer un autre identifiant "
            return res.status(404).json({message}) 
        }

       mail_refus.send(client.pseudo,client.email)

       //
        const demande_resevationsdelete=demande_reservations;
        demande_reservations.destroy({
            where :  id_demande_reservation=demande_reservations.id_demande_reservation
        }).then()

}
   )}

    
     res.json(message)
  
  

    }
    
    catch(error) {
     if(error instanceof ValidationError ){
        console.log(error);
     return res.status(400).json({message: error.message,data: error})
    
    }
    if(error instanceof UniqueConstraintError){
     return res.status(400).json({message: error.message})
    }
    const message="la Reservations n'a pas pue etre ajouter"

    console.log(error);
    res.status(500).json({message, data:error})
    
 }
 })}