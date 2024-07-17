const {User }= require('../db/sequelize')
const bcrypt = require('bcrypt')
const {ValidationError}=require('sequelize')
const cors=require("cors")
var utilisateurs=require("../models/Users")
module.exports =(app) =>{
    app.put('/api/utilisateur/modifier/mot_de_passe', cors(),(req,res) =>
    { 
          
if(req.body.mot_de_passe ){
        const salt = 10
        bcrypt.genSalt(salt, function(err, salt) {
           bcrypt.hash(req.body.mot_de_passe, salt, function(err, hash) {
               if (!err) {
                console.log(hash)
                   utilisateurs.mot_de_passe=hash
                   console.log(utilisateurs)
                   
                   User.update(utilisateurs,{
                    where: { email: req.body.email}
        
                })
                .then(_=>{
                  return User.findOne({
                    where:{email:req.body.email}
                  }).then(users => {
                   // console.log(utilisateurs)
                        if(users===null)
                        {
                            
                            const message="le Users n'existe pas "
                                res.status(404).json({message}) 
                            
                        }
                       
                        res.json({users})
                    })
                
                    }).catch(error =>{
                        const message="le Users n'a pas pue etre modifier,reesayer dans quelques instant"
                        res.status(500).json({message,data: error}) 
                        console.log(error)
                    }).catch(error => {
                        if(error instanceof ValidationError ){
                        return res.status(400).json({message: error.message,data: error})
                       }
        
                     
                    
                       
                    })
               }
           });
       });
        
      }
  }



)
    }
