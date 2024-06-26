const {Image}= require('../db/sequelize')

const cors= require('cors')
module.exports= (server) => {

  
   
   server.get('/api/image/:id',cors(),  async(req,res)=>{
     
       Image.findAll({
        where: {
            id_salle: req.params.id}
         
  })
       .then(Image =>{
          
     

       res.json(Image)

       })
       .catch (error =>{
           const message="la liste des Image n'a pas ete recupere,reesayer dans quelques instant"
           res.status(500).json({message,data: error}) 
       })

      
      

     
   }) 
}