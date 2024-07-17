const {Salle,Demande_reservation}= require('../db/sequelize')

var salle = require("../models/Salle")
var demande_reservation= require ("../models/Demande_reservation")
const schedule = require('node-schedule');


module.exports.miniteur_fin = async function (salle,date_fin) {
 const dateAlarme = new Date(date_fin);
 console.log('Alarme planifiée pour :', dateAlarme);

 // Planifier l'exécution de la fonction d'alarme à la date spécifiée
 const job = schedule.scheduleJob(dateAlarme, async () => {

      Salle.update({etat:0},{ where: {id_salle: salle.id_salle}

  })

 console.log("la reservation a expiré!!!.... !");
 });
}
