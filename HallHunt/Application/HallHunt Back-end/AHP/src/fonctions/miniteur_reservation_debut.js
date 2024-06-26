
const schedule = require('node-schedule');



module.exports.miniteur =  function (id,date_debut) {
    const dateAlarme = new Date(date_debut);
    console.log('Alarme planifiée pour :', dateAlarme);

    console.log(' date : ' + dateAlarme);


  
    // Planifier l'exécution de la fonction d'alarme à la date spécifiée
    const job = schedule.scheduleJob(dateAlarme, () => {
    });

    //console.log('Alarme sonne il est  : ' + dateAlarme);

}


