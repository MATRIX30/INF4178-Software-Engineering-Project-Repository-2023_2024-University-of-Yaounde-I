const express = require('express')
const cookiesParser = require('cookie-parser')
const session = require('express-session')
const morgan =require('morgan')
const favicon=require('serve-favicon')
const bodyParser=require('body-parser')
const {sequelize} = require('./src/db/sequelize')
const ejs = require("ejs")
const path= require("path")
const expressJwt = require('express-jwt');
const privatekey=require('./src/db/auth/private_key');
const sequelizeSession = require('connect-session-sequelize')(session.Store)
require("dotenv").config();

const cors =require('cors')




const app =express()
const port = 3000
const oneDay = 1000 * 60 * 60 * 24 
//synchronisation a la base de donnee embarque
sequelize.sync({force:false}).then( ()=>console.log('base de donnée pret'));

//session middleware
global.isConnected = false;
const axios= require('axios')
const host ='localhost'

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

.use(morgan('dev'))
//.use(expressJwt({ secret: privatekey }).unless({ path: ['/api/login'] }))
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended:true}))
.use(cors({ origin: '*',
methods:"GET,POST,HEAD,PUSH,DELETE,PATCH,PUT" }));

//ici, nous placerons nos futurs points de terminaison. 


// point de terminaison des utilisateurs
require('./src/routes/connexion')(app)                                // http://localhost:3000/api/login  

                                                                         // http://localhost:3000/api/admin/logout  

                                                                        // http://localhost:3000/api/logout


require('./src/routes/creation_utilisateur')(app)                    //  http://localhost:3000/api/register

require("./src/routes/modifier_mot_de_passe")(app)                         // http://localhost:3000/api/utilisateur/modifier/speudo
 
require("./src/routes/liste_utilisateur")(app)

app.get('/', (req, res,next) => {

     res.send("image utilisateur")
 })

//On ajoute la gestion des erreurs 404
app.use(({res})=>{
    const message ='Impossible de trouver la ressource demandée! vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})
app.listen(port,()=>{
   
  console.log(`Notre application Node est démarrée sur : http://localhost:${port}`)})  
