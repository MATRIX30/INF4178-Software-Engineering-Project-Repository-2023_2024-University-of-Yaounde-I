
const nodemailer=require('nodemailer');

module.exports.send = async function(pseudo,titre_formation,prix) {
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.email',
 service:"gmail",
 secure:false,
  auth: {
    user: 'france.etudes237@gmail.com',
    pass: 'qnod fruy upri jjqa'
  }
});
const mailOptions = { from: '  "FranceÉtudes"   <france.etudes237@gmail.com>',
to:`   "FranceÉtudes"   <france.etudes237@gmail.com>  `,
subject:" Demande d'abonnement " ,
text:  ` Salut Ismael!\n\n\n `,
html: ` <p style="margin-left: 20px; font-size: 16px; color: black;">  l'utilisateur  : <span style="font-size: 24px; font-weight: bold;">${pseudo}</span>  demande un abonnement à la formation  <span style="font-size: 24px; font-weight: bold;">${titre_formation}</span> au prix de : <span style="font-size: 24px; font-weight: bold;">${prix}</span> .</p> `
};

try {
        await  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    else {
      console.log("mail envoye:" + pseudo + "       " + info.response);
    }
  })
} catch (error) {
console.error('Une erreur s\'est produite lors de l\'envoi du message :', error);
}
}



