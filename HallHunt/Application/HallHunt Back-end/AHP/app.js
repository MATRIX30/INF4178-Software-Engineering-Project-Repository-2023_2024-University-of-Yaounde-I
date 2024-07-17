const express = require('express')
const cookiesParser = require('cookie-parser')
const session = require('express-session')
const {User}= require("../AHP/src/db/sequelize")
const favicon=require('serve-favicon')
const bodyParser=require('body-parser')
const {sequelize} = require('./src/db/sequelize')
const ejs = require("ejs")
const path= require("path")
const amqp= require("amqplib/callback_api")
const expressJwt = require('express-jwt');

const sequelizeSession = require('connect-session-sequelize')(session.Store)
require("dotenv").config();

const cors =require('cors')
let utilisateur= require("./src/models/Users")
const app =express()

const port =  process.env.PORT || 3001
const oneDay = 1000 * 60 * 60 * 24 
//synchronisation a la base de donnee embarque
sequelize.sync({force:false}).then( ()=>console.log('base de donnée pret'));

//session middleware
global.isConnected = false;
const corsOptions = {
    origin: '*', // Remplacez par votre/vos origine(s) autorisée(s)
    credentials: true, // Autoriser les cookies pour les requêtes authentifiées (si applicable)
    optionsSuccessStatus: 200, // Code de statut personnalisé pour les requêtes de pré-vol (optionnel)
  };

app.use("/public/data/uploads",express.static(path.join(__dirname,"/public/data/uploads")))
app.use(cookiesParser())
.use(session({
    name: process.env.SESSION_NAME,
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false,
    cookie :{
        maxAge :  1000 * 60 * 60 * 24 * 7,
        secure: false,
    } ,
    store:new sequelizeSession({
        db:sequelize
    })
}))
.use(express.static(__dirname))


//.use(expressJwt({ secret: privatekey }).unless({ path: ['/api/login'] }))
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended:true}))
.use(cors(corsOptions));

try{
    
  amqp.connect(`amqp://localhost`, (err,connection)=>{
    if(err){
        throw err;
    }
  
    connection.createChannel((err,channel)=>{
        if(err){
            throw err
        }
     let queueName="nouvel utilisateur"
      
        channel.assertQueue(queueName,{
            durable:false
        })
        channel.consume(queueName,(ingenieur)=>{
 utilisateur= JSON.parse(ingenieur.content.toString())
       
 utilisateur.status=0
         
           User.create(utilisateur);
            channel.ack(ingenieur)
        })
  } )})
  
  }
      
    catch(error){
      const message = `L'ingenieur  n'a pas pu être récupérée. Réessayez dans quelques instants.`
     
      console.log(error)
    }

//ici, nous placerons nos futurs points de terminaison. 


//point de terminaison des salle
require('./src/routes/creation_salle')(app);                     //http://localhost:3000/api/creation/salle/id   id c'est l'identifiant de l'utilisateur qui cree la sallle 

require('./src/routes/resultat_ahp')(app);                      //http://localhost:3000/api/creation/salle/id  


require("./src/routes/liste_image_complet")(app);                        //http://localhost:3001/api/liste/imagecomplet 

require("./src/routes/lister_image_id_salle")(app);                        //http://localhost:3001/api/image/:id




require("./src/routes/reservation")(app)                  //http://localhost:3001/api/creation/reservation/:id_demande_reservation

require("./src/routes/listesalle_id")(app);      //http://localhost:3000/api/salle/:id
require("./src/routes/modifier_salle")(app);     //http://localhost:3000/api/salle/modifier/:id
require("./src/routes/supprimer_salle")(app);    //http://localhost:3000/api/salle/supprimer/:id

require("./src/routes/liste_salle")(app);                        //http://localhost:3000/api/creation/salle/id 

require("./src/routes/filtre_salle")(app);                        //http://localhost:3000/api/salle/filtre 

require("./src/routes/demande_reservation")(app)                  //http://localhost:3001/api/demande/reservation/:id_client
require("./src/routes/liste_demande_reservation")(app)   //http://localhost:3001/api/liste/demande_reservation/:id_utilisateur
require("./src/routes/demande_reservation")(app)    //http://localhost:3001/api/demande/reservation/:pseudo_clent
require("./src/routes/filtre_nom")(app);                        //http://localhost:3000/api/salle/:nom

app.get('/', (req, res) => {

  res.json( "API deployer avec sucess...😁")
 })

//On ajoute la gestion des erreurs 404
app.use(({res})=>{
    const message ='Impossible de trouver la ressource demandée! vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

app.listen(port,()=>console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))