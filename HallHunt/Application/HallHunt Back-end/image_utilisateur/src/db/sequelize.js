const Usermodel= require("../models/Users")
const Adressemodel=require("../models/Adresse")
const { Sequelize, DataTypes } = require('sequelize')

  
const sequelize = new Sequelize('bd', 'root', '', {
  host: 'bd.sqlite',
  dialect: 'sqlite',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging:true
})

const User=Usermodel(sequelize,DataTypes);
const Adresse=Adressemodel(sequelize,DataTypes);



User.hasMany(Adresse,{
  foreignKey:'id_utilisateur',
  as: 'adresse_utilisateur',
  onDelete:'CASCADE'
})

Adresse.belongsTo(User,{
  foreignKey: 'id_utilisateur',
  as: 'adresse_utilisateur',
  hooks:true
})




const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
      console.log('La base de donnée a bien été initialisée !')
    })
  }
    
  
  module.exports = { 
   sequelize,User,Adresse
  }
  