const cors = require("cors");
const resultat = require("../fonctions/pair_wise-matrix");
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')

const {Salle}= require('../db/sequelize')
var salles= require("../models/Salle")
module.exports = (server) => {
  server.post('/api/resultat_ahp', cors(), async (req, res) => {
    try {

             

     let  salle = await resultat.pair_wise_matrix(req.body.preference_prix_capacite,req.body.preference_prix_standing,req.body.preference_prix_acces,req.body.preference_capacite_standing,req.body.preference_capacite_acces,req.body.preference_standing_acces); // Utilisez directement await pour attendre que la promesse se résolve
      // Vérifiez que les données sont correctes dans la console
         
console.log("tableau salle 0 "+salle[0])
     var resultats=[];
     
for (i = 0; i < salle.length; i += 1) {

  salles= await Salle.findOne({  where: {
    nom: salle[i]}})
     
    resultats.push(salles)

}
     
     
    
       

       // console.log(salles)
    
      res.json(resultats); // Renvoyer les données au format JSON
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error("Erreur de validation : ", error);
        res.status(400).json({ message: "Erreur de validation des données" });
      } else if (error instanceof UniqueConstraintError) {
        console.error("Erreur de contrainte unique : ", error);
        res.status(409).json({ message: "Violation de contrainte unique" });
      } else {
        console.error("Une erreur s'est produite : ", error); // Gérer les erreurs éventuelles
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des données" });
      }
    }
  });
};
