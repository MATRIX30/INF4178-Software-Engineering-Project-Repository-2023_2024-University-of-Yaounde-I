const {User}= require('../db/sequelize')




const cors= require('cors')


module.exports= (server) => {
   server.get('/api/liste/utilisateur',cors(),async(req,res)=>{
   
try {

    User.findAll({}).then(utilisateurs => {
        console.log(utilisateurs)
      res.json(utilisateurs)
    })
      }
catch (error ){
        
           res.status(500).json({data: error}) 
           console.log(error)}
       
   }) 
}