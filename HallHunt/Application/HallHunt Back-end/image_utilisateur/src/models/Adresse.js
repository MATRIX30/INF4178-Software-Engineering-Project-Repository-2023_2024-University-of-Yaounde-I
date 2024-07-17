module.exports = (sequelize, DataTypes) => {
    return sequelize.define('adresse', {
      id_adresse: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ville: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: 'Le nom ne doit pas être vide'},
          notNull: {msg: 'Le nom est une propriété requise'}
        }
      },

      region : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: 'Le mot de passe ne doit pas être vide'},
          notNull: {msg: 'Le mot de passe est une propriété requise'}
        }
      },
     quartier: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: `Email ne doit pas être vide`},
          notNull: {msg: `Votre email est obligatoire merci de le renseigner`}
        }
      },
      pays: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: `Email ne doit pas être vide`},
          notNull: {msg: `Votre email est obligatoire merci de le renseigner`}
        }
      },
      id_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {msg: `Erreur de génération d'un status`},
          notNull: {msg: 'Erreur  status non valide'}
        }
      }
    }, {
      timestamps: true,
      createdAt: 'date_creation',
      updatedAt: false
    })
  }