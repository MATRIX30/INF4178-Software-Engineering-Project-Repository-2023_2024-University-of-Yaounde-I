
const nodemailer=require('nodemailer');


const reservation=  require("../fonctions/creation_reservation")

module.exports.send = async function(pseudo_proprietaire,mail) {


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
  to:` ${pseudo_proprietaire}  < ${mail}>  `,
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
  
  
  <div>
  Cher(e) ${pseudo_proprietaire},
  NOus vous annonçons  qu'une de vos  salle  a été demander 
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
