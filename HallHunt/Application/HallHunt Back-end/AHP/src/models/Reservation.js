

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('reservation', {
      id_reservation: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
     
      id_demande_reservation : {
        type: DataTypes.INTEGER,
      
      },

     
    }, {
      timestamps: true,
      createdAt: 'date_validation_resevation',
      updatedAt: false
    })
  }