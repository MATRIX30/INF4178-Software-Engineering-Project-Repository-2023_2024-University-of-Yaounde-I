const {Demande_reservation}= require('../db/sequelize')
const cors= require('cors')
const Sequelize = require('sequelize')


module.exports= (server) => {
   server.get('/api/liste/demande_reservation/:id_utilisateur',cors(),async(req,res)=>{
   
try {

   var demande_reservations= await  Demande_reservation.findAll({  where: {
    id_proprietaire: req.params.id_utilisateur}})
      
      res.json(demande_reservations) }
      
       catch (error ){
        
           res.status(500).json({data: error}) 
           console.log(error)}
       
   }) 
}