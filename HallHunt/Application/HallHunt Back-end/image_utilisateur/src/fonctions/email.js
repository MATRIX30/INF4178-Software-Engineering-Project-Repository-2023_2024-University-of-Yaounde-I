
const nodemailer=require('nodemailer');
module.exports.send = async function(mail,pseudo) {


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
