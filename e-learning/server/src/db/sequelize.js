const { Sequelize, DataTypes } = require("sequelize");
// const bcrypt = require("bcrypt");

// importation des models

const { etudiant, formateur, administrateur } = require("../models/userModel");
const { cours, evaluation, question } = require("../models/coursModel");
const { domaine } = require("../models/domainModel");

// configuration de la base de donnees
let sequelize;
if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(
    "q3km6gfiypm99yap",
    "fmjzknms6lf6acih",
    "mpe1lmb1jci8jwzx",
    {
      host: "ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      dialect: "mariadb",
      dialectOptions: {
        timezone: "Etc/GMT-1",
      },
      logging: true,
    }
  );
} else {
  // sequelize = new Sequelize({
  //   dialect: "sqlite",
  //   storage: "/home/developpeur/test.db", // Chemin vers le fichier SQLite
  // });

  // connection a la db en local
  sequelize = new Sequelize("institute", "root", "", {
    host: "localhost",
    dialect: "mariadb",
    dialectOptions: {
      timezone: "Etc/GMT-1",
    },
    logging: false,
    define: {
      maxKeys: 200,
    },
  });
}

// creation des models
const DomainTable = domaine(sequelize, DataTypes);
const CoursTable = cours(sequelize, DataTypes);
const EvaluationTable = evaluation(sequelize, DataTypes);
const QuestionTable = question(sequelize, DataTypes);
const EtudiantTable = etudiant(sequelize, DataTypes);
const FormateurTable = formateur(sequelize, DataTypes);
const AdministrateurTable = administrateur(sequelize, DataTypes);

//association de la baase de donnees

function initDB() {
  console.log("Initialisation des tables de la base de données");
  return sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Tables have been created");
    })
    .catch((error) => {
      console.error("Unable to create tables:", error);
    });
}


module.exports = {
  CoursTable,
  AdministrateurTable,
  EvaluationTable,
  initDB,
  CoursTable,
  QuestionTable,
  EtudiantTable,
  FormateurTable,
  DomainTable,
};

// .then(_=>{
//   bcrypt.hash('12345678', 1)
//         .then(hash=>{

//     schoolTable.create({
//         name: "nkoaban",
//         adresse:"yaounde"
//     })

//     userTable.create({
//         name: 'loico',
//         email: 'loioico@gmail.com',
//         password: hash,
//         role:'admin'
//     })

//     payTable.create({
//         amount: 100000,
//         status:"tranche2",
//         userId:1,
//         studentId:1

//     })

//     studentTable.create({
//         name: 'jean',
//         class: 'terminaleC',
//         school:"lycee bilingue ekounou",
//         sex:"m",
//         birthday:new Date(1998, 6, 20),
//         birth_place:"doual",
//         phone:"123456787",
//         school_situation:"ancien",
//         class_situation:"ancien",
//         schoolId:1,

//     })
//   })
//   })
