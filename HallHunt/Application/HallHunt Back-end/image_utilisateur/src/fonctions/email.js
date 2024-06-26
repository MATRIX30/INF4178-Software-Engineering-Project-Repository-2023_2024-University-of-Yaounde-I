
const nodemailer=require('nodemailer');
module.exports.send = async function(mail,pseudo) {


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.email',
    service:"gmail",
    secure:false,
    auth: {
      user: 'isma.fran.etud.site.web23782@gmail.com',
      pass: 's m p d a z xo l o t k h h w h'
     }
  });
const mailOptions = {
  from: 'isma.fran.etud.site.web23782@gmail.com',
  to: mail,
  subject: "Confirmation d'inscription",
  text:  `Félicitation ${pseudo} votre inscription a ete confirme dans le site pour la gestio des chantier  . `
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
