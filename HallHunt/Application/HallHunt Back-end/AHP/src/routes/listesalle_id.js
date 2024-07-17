const {Salle}= require('../db/sequelize')
const cors= require('cors')


module.exports= (server) => {
   server.get('/api/salle/:id',cors(),async(req,res)=>{

    

    Salle.findOne({
       where: {
      id_salle: req.params.id}
   })
       .then(salles => {
        
         res.json(salles)
       })
       .catch(error => {
         const message = `La formation  n'a pas pu être récupérée. Réessayez dans quelques instants.`
         res.status(500).json({message, data:error})
         console.log(error)
       })
   })
}