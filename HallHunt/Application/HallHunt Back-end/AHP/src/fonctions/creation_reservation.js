
const {Reservation,Salle}= require('../db/sequelize')

const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')




const reservation = require('../models/Reservation')

module.exports.cree=  async function(tabs,mail){
   
   try {
    
    reservation.id_client=req.params.id_client;
    reservation.id_salle= req.body.id_salle
   

    var salle=  await  Salle.findOne({
        where: {
       id_salle: req.body.id_salle}
    })


    reservation.id_proprietaire= 


    

   Reservation.create(Reservation)
    .then(Reservations =>{
        const message ='le Reservations a bien ete ajouter.'
      
    
         images.image(req.files,Reservations.id_Reservation)

        res.json({message,data: Reservations})


    }) }
    
    catch(error ) {
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
 }