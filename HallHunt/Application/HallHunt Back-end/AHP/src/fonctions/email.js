
const nodemailer=require('nodemailer');


const reservation=  require("../fonctions/creation_reservation")

module.exports.send = async function(pseudo_client,nom_salle,date_reservation,duree,mail,pseudo_proprietaire) {


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.email',
    service:"gmail",
    secure:false,
     auth: {
      user: 'franckemerites45@gmail.com',
      pass: 'tavo ksgb emry ftls'
     }
  });
const mailOptions = {
  from: '  "HallHunt"   <franckemerites45@gmail.com>',
  to:` ${pseudo_client}  < ${mail}>  `,
  subject: "Demande de  reservation ",
  html : `<!DOCTYPE html>
  <html>
  <head>
  <title>Formulaire avec boutons Oui/Non</title>
  <style>
    .buttons {
      margin-top: 20px;
    }
  </style>
  </head>
  <body>
  
  <h1> Confirmation de reservation</h1>
  
  <div
  Cher(e) ${pseudo_client},
  
  Nous sommes ravis de vous informer que votre réservation sur notre plateforme a été approuvée avec succès. Votre demande a été traitée et confirmée, et nous sommes impatients de vous accueillir lors de votre séjour.
  
  Voici un récapitulatif de votre réservation :
  - Nom de la salle prévue pour  l'événement : ${nom_salle}
  - Date de la réservation : ${date_reservation}
  -  duree: ${duree}
 
  
  Si vous avez des questions supplémentaires ou si vous avez besoin d'une assistance particulière, n'hésitez pas à nous contacter. Nous sommes là pour vous aider et nous ferons tout notre possible pour rendre votre expérience aussi agréable que possible.
  
  Nous vous remercions de votre confiance et nous espérons que votre réservation répondra à toutes vos attentes.
  
  Cordialement,
  HallHunt
  </div>

  </body>
  </html>`
  
};

         transporter.sendMail(mailOptions,function (error,info){
          if(error){
          console.log(error);
          }
          else{
            console.log("mail envoye"+ info.response);
          }})


  /*
   
    /*

 */
} 
