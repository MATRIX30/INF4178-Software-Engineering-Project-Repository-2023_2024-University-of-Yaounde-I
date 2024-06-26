const Usermodel= require("../models/Users")

const Sallemodel=require("../models/Salle")

const Reservationmodel=require("../models/Reservation")

const Demande_reservationmodel=require("../models/Demande_reservation")

const Imagesmodels=require("../models/Images")

const Video_uploadsmodels= require("../models/Videos_upload")

const { Sequelize, DataTypes } = require('sequelize')
let sequelize

if(process.env.NODE_ENV ==='production'){  
  
sequelize = new Sequelize('r0lp7vs9e0pn9inx', 'iyhhd976otl5awbi', 'k9ydpdwuasuqnia6', {
  host: 'u3r5w4ayhxzdrw87.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging:true
})
}

else{
  
 sequelize = new Sequelize('bd', 'root', '', {
  host: 'bd.sqlite',
  dialect: 'sqlite',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging:true
})
}
const Image=Imagesmodels(sequelize,DataTypes);

const User=Usermodel(sequelize,DataTypes);

const Salle=Sallemodel(sequelize,DataTypes);

const Reservation=Reservationmodel(sequelize,DataTypes);


const Demande_reservation=Demande_reservationmodel(sequelize,DataTypes);

const Videos_upload= Video_uploadsmodels(sequelize,DataTypes);


Salle.hasMany(Videos_upload,{
  foreignKey: "id_salle",
  as: 'video_uploads',
  onDelete: 'CASCADE'
})

Videos_upload.belongsTo(Salle,{
  foreignKey: 'id_salle',
  as: "video_upload",
 
})



User.hasMany(Salle,{
  foreignKey: "id_utilisateur",
  as: 'salle_utilisateur',
  onDelete: 'CASCADE'
})

Salle.belongsTo(User,{
  foreignKey: 'id_utilisateur',
  as: "salle_utilisateur",
 
})




User.hasMany(Reservation,{
  foreignKey: "id_client",
  as: 'reservation_utilisateur',
  onDelete: 'CASCADE'
})

Reservation.belongsTo(User,{
  foreignKey: 'id_client',
  as: "reservation_utilisateur",
 
})



User.hasMany(Demande_reservation,{
  foreignKey: "id_proprietaire",
  as: 'demande_reservation_utilisateur',
  onDelete: 'CASCADE'
})

Demande_reservation.belongsTo(User,{
  foreignKey: 'id_proprietaire',
  as: "demande_reservation_utilisateur",
 
})


Salle.hasMany(Image,{
  foreignKey:'id_salle',
  as: 'image_Salle',
  onDelete:'CASCADE'
})

Image.belongsTo(Salle,{
  foreignKey: 'id_salle',
  as: 'image_Salle',
 
  hooks:true
})

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
      console.log('La base de donnée a bien été initialisée !')
    })
  }
    
  
  module.exports = { 
   sequelize,User,Salle,Image,Videos_upload,Reservation, Demande_reservation
  }