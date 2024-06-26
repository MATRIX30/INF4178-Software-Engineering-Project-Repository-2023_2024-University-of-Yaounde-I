const cors = require("cors");
const resultat = require("../fonctions/pair_wise-matrix");


const {Salle}= require('../db/sequelize')
var salles= require("../models/Salle")
module.exports = (server) => {
  server.post('/api/resultat_ahp', cors(), async (req, res) => {
    try {

             

     let  salle = await resultat.pair_wise_matrix(req.body.preference_prix_capacite,req.body.preference_prix_standing,req.body.preference_prix_acces,req.body.preference_capacite_standing,req.body.preference_capacite_acces,req.body.preference_standing_acces); // Utilisez directement await pour attendre que la promesse se résolve
      // Vérifiez que les données sont correctes dans la console
      salles= await Salle.findOne({  where: {
        nom: salle.nom}})
       

        console.log(salles)
    
      res.json(salles); // Renvoyer les données au format JSON
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
