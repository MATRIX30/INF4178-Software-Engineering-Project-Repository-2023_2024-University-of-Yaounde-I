const {Salle}= require('../db/sequelize')
const cors= require('cors')
const Sequelize = require('sequelize')

const Op = Sequelize.Op;

module.exports= (server) => {
   server.get('/api/liste/salle',cors(),async(req,res)=>{
   
try {

   var Salles= await  Salle.findAll({where:{etat: 0}})
      
      res.json(Salles) }
      
       catch (error ){
        
           res.status(500).json({data: error}) 
           console.log(error)}
       
   }) 
}