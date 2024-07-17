

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('salle', {
      id_salle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nom: {
      
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg: 'ce nom est deja pris' 
       },
        validate: {
          notEmpty: {msg: 'Le suject ne doit pas être vide'},
          notNull: {msg: 'Le suject  est une propriété requise'}
        }},
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: `description ne doit pas être vide`},
          notNull: {msg: `Votre description est obligatoire merci de le renseigner`}
        }
      },
      niveau_d_accesibilite : {
        type: DataTypes.INTEGER,
     
      },
     
      standing : {
        type: DataTypes.INTEGER,
      
      },

      etat : {
        type: DataTypes.INTEGER,
      
      },

      prix : {
        type: DataTypes.FLOAT,
      
      },
    
      capacite : {
        type: DataTypes.INTEGER,
      
      },


      
      id_utilisateur : {
        type: DataTypes.INTEGER,
      
      },
     
    }, {
      timestamps: true,
      createdAt: 'date_creation',
      updatedAt: false
    })
  }