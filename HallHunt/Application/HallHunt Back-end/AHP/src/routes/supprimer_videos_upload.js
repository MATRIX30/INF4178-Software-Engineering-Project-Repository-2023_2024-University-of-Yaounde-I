
const {Videos_upload}= require('../db/sequelize');
const cors=require("cors")

const supprimer= require("../fonctions/supprimer_image")


module.exports = (app)=>{
    app.delete('/api/video/supprimer/:id', cors(), async(req,res)=>{


       Videos_upload.findOne({ where: {
            id_videos: req.params.id}}
         )
        .then(video => {
            if(video===null){
                const message="la Videos n'existe pas, essayer un autre identifiant "
                return res.status(404).json({message}) 
            }

           

            supprimer.supprimer(video.chemin )
            const videosdelete=video;
           video.destroy({
                where : id_videos=video.id_videos
            }).then()
            return  res.json(videosdelete)  
        })

    }
    )}
