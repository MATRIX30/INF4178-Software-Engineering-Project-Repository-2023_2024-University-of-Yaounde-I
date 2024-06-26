const {Salle}= require('../db/sequelize')
const cors= require('cors')




module.exports= (server) => {
   server.post('/api/salle/filtre',cors(),async(req,res)=>{


    try {
var critere= {prix:0,standing:0,niveau:0,capacite:0}

var resultat= []
critere.prix= req.body.prix
critere.capacite= req.body.capacite
critere.standing= req.body.standing
critere.niveau= req.body.niveau


console.log(critere.prix)

console.log(critere.capacite)

console.log(critere.standing)

console.log(critere.niveau)


var liste_des_salles = await Salle.findAll()

liste_des_salles.forEach(elements=>{
     
    if((critere.prix!=null)&&(critere.capacite!=null)&&(critere.standing!=null)&&(critere.niveau!=null)){
      
        if( (elements.prix <= (critere.prix + 50000)) && ( (critere.prix - 50000) <= elements.prix)){
           
                   if( elements.capacite >= critere.capacite){
                  
                            if( elements.standing===critere.standing){

                                    if(elements.niveau_d_accesibilite===critere.niveau){
                                     
                                                resultat.push(elements)
                        }
                    }
}
}
}

else if((critere.prix == null)&&(critere.capacite!==null)&&(critere.standing!==null)&&(critere.niveau!==null)){

       if( elements.capacite >= critere.capacite){

                        if( elements.standing===critere.standing){

                                if(elements.niveau_d_accesibilite===critere.niveau){
                          
                                            resultat.push(elements)
                    }
                }

}
}


else  if((critere.prix!==null)&&(critere.capacite == null)&&(critere.standing!==null)&&(critere.niveau!==null)){

    if( (elements.prix <= (critere.prix + 50000)) && ( (critere.prix - 50000) <= elements.prix)){
             
                        if( elements.standing===critere.standing){

                                if(elements.niveau_d_accesibilite===critere.niveau){
                          
                                            resultat.push(elements)
                    }
                
}
}


}




else  if((critere.prix!==null)&&(critere.capacite !== null)&&(critere.standing == null)&&(critere.niveau!==null)){

    if( (elements.prix <= (critere.prix + 50000)) && ( (critere.prix - 50000) <= elements.prix)){
             
              if(elements.niveau_d_accesibilite===critere.niveau){
                          
                                            resultat.push(elements)
                
}
}
}


else if((critere.prix!==null)&&(critere.capacite !== null)&&(critere.standing!==null)&&(critere.niveau==null)){

    if( (elements.prix <= (critere.prix + 50000)) && ( (critere.prix - 50000) <= elements.prix)){
        if( elements.capacite >= critere.capacite){

                 if( elements.standing===critere.standing){

                       
                                     resultat.push(elements)
             
         }
}
}
}




else if((critere.prix == null) && (critere.capacite == null)&&(critere.standing!==null)&&(critere.niveau !==null)){

    if( elements.standing===critere.standing){
  
        if(elements.niveau_d_accesibilite===critere.niveau){
  
                    resultat.push(elements)
}
}
}




else if((critere.prix == null) && (critere.capacite !== null)&&(critere.standing !==null)&&(critere.niveau ==null)){
    if( elements.capacite >= critere.capacite){

        if( elements.standing===critere.standing){

                  resultat.push(elements)
    
}
}
}



else if((critere.prix == null) && (critere.capacite !== null)&&(critere.standing ==null)&&(critere.niveau !==null)){
   
        
                   if( elements.capacite >= critere.capacite){

                                    if(elements.niveau_d_accesibilite===critere.niveau){
                              
                                                resultat.push(elements)
                        }
                    }
}



else if((critere.prix !== null) && (critere.capacite == null)&&(critere.standing ==null)&&(critere.niveau !==null)){
   
        
    if( (elements.prix <= (critere.prix + 50000)) && ( (critere.prix - 50000) <= elements.prix)){
       

                         if(elements.niveau_d_accesibilite===critere.niveau){
                   
                                     resultat.push(elements)
             }
         }
}





else if((critere.prix !== null) && (critere.capacite == null)&&(critere.standing !==null)&&(critere.niveau ==null)){
   

if( (elements.prix <= (critere.prix + 50000)) && ( (critere.prix - 50000) <= elements.prix)){
   
      if( elements.standing===critere.standing){

                   resultat.push(elements)
        }

}

}



else if((critere.prix == null) && (critere.capacite == null)&&(critere.standing ==null)&&(critere.niveau !==null)){
  
     if(elements.niveau_d_accesibilite  ===critere.niveau){
                   
                    resultat.push(elements)
             }
}



else if((critere.prix == null) && (critere.capacite == null)&&(critere.standing !==null)&&(critere.niveau ==null)){
  
 if( elements.standing===critere.standing){

                 resultat.push(elements)
      }

}



else if((critere.prix == null) && (critere.capacite !== null)&&(critere.standing ==null)&&(critere.niveau ==null)){
  
    
    if( elements.capacite >= critere.capacite){

       resultat.push(elements)
}
   }


   

else if((critere.prix !== null) && (critere.capacite == null)&&(critere.standing ==null)&&(critere.niveau ==null)){
  
    if( (elements.prix <= (critere.prix + 50000)) && ( (critere.prix - 50000) <= elements.prix)){
     
                       
                                     resultat.push(elements)
}
 }

})


if(resultat.length===0){
    resultat= "aucun element n'est trouver"
}
        
         res.json(resultat)

         resultat= []
    
  } catch(error) {
         const message = `La formation  n'a pas pu être récupérée. Réessayez dans quelques instants.`
         res.status(500).json({message, data:error})
         console.log(error)
       }
   })}