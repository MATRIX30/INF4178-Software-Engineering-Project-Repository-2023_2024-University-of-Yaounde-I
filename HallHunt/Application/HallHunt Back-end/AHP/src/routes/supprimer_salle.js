const {Salle}= require('../db/sequelize');
const {Image}= require('../db/sequelize');
const {Videos_upload}= require('../db/sequelize');
const cors=require("cors")

const supprimer= require("../fonctions/supprimer_image")


module.exports = (app)=>{
    app.delete('/api/salle/supprimer/:id', cors(), async(req,res)=>{
                   Image.findOne({
        where: {
            id_salle: req.params.id}
      }) .then(Images =>{
    
        console.log(Images)
        //supprimer.supprimer(Images.chemin )

         })
        Salle.findOne({ where: {
            id_salle: req.params.id}}
         )
        .then(Salle => {
            if(Salle===null){
                const message="le Salles n'existe pas, essayer un autre identifiant "
                return res.status(404).json({message}) 
            }

           

           //
            const Sallesdelete=Salle;
            Salle.destroy({
                where : id_salle=Salle.id_salle
            }).then()
            return  res.json( Sallesdelete)  
        })

    })
}