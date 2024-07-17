

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('demande_reservation', {
      id_demande_reservation: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
     
      id_client : {
        type: DataTypes.INTEGER,
      
      },

      id_proprietaire : {
        type: DataTypes.INTEGER,
       },

       nom_salle: {
      
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: 'Le suject ne doit pas être vide'},
          notNull: {msg: 'Le suject  est une propriété requise'}
        }},


  date_debut : {
    type: DataTypes.DATE,
    allowNull:false,
   
      },
      duree : {
        type: DataTypes.INTEGER,
      
      },
     
    }, {
      timestamps: true,
      createdAt: 'date_validation_resevation',
      updatedAt: false
    })
  }