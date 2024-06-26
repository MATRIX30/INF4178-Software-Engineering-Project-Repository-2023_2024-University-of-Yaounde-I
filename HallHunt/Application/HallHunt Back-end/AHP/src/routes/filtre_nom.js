const {Salle}= require('../db/sequelize')
const cors= require('cors')
const Sequelize = require('sequelize')

const Op = Sequelize.Op;

module.exports= (server) => {
   server.get('/api/liste/salle/:word',cors(),async(req,res)=>{
   
try {

   var Salles= await  Salle.findAll({ where: {
      nom: {
        [Op.like]: `%${req.params.word}%`
      }
    }})
      
      res.json(Salles) }
      
       catch (error ){
        
           res.status(500).json({data: error}) 
           console.log(error)}
       
   }) 
}