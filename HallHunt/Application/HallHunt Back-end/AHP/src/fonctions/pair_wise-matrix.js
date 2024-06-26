
const linearAlgebra = require('linear-algebra')();

const Matrix = linearAlgebra.Matrix;
const ri = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41];
const {Salle} = require("../db/sequelize")

var salle= require("../models/Salle")
module.exports.pair_wise_matrix = async function(preference_prix_capacite ,preference_prix_standing,preference_prix_acces,preference_capacite_standing,preference_capacite_acces,preference_standing_acces) {

  // pair wise matrix 

  const c = new Matrix([[1,preference_prix_capacite,preference_prix_standing,preference_prix_acces],[1/preference_prix_capacite, 1,preference_capacite_standing,preference_capacite_acces], [1/preference_prix_standing, preference_capacite_standing,1,preference_prix_standing],[1/preference_prix_acces,1/preference_capacite_acces,1/preference_standing_acces,1]]);
try {

  


  let j; // Cols
  let i = 0; // Rows
  let colsum = 0;
  let num = 0;
  let  colsumArray=[]

  for (j = 0; j < c.cols; j += 1) {
    for (i = 0; i < c.rows; i += 1) {
      num = c.data[i][j];
      colsum = num + colsum;
    }


    colsumArray.push(colsum);

    colsum = 0;
  }
  let mcolsumArray = [];


  i = 0;
  for (i = 0; i < c.rows; i += 1) {
    mcolsumArray.push(colsumArray);
  }

  mcolsumArray = new Matrix(mcolsumArray);

// naomalized  pair wise matrix 

let nc = [];

nc = c.div(mcolsumArray);

//calcul du creteria weigth


const ev = [];
  num = 0;
  i = 0;
  j = 0;
  for (i = 0; i < c.rows; i += 1) {
    for (j = 0; j < c.cols; j += 1) {
      num = nc.data[i][j] + num;
    }
    num /= c.cols;

    ev.push(num);
    num = 0;
  }


  j = 0;
  let em = [];
  for (j = 0; j < c.cols; j += 1) {
    em.push(ev);
  }
  em = new Matrix(em);


    // Computing consistency matrix
    const cm = c.mul(em);


  //Calculate criteria weighted sum

  const wsm = [];
  num = 0;
  i = 0;
  i = 0;
  for (i = 0; i < c.rows; i += 1) {
    for (j = 0; j < c.cols; j += 1) {
      num = cm.data[i][j] + num;
    }
    wsm.push(num);
    num = 0;
  }

  
  // Lamda i 
  const lamda = [];
  j = 0;
  for (j = 0; j < c.cols; j += 1) {
    lamda.push(wsm[j] / ev[j]);
  }
  
  
  // LamdaMax

  let lamdaMax = 0;
  j = 0;
  for (j = 0; j < c.cols; j += 1) {
    num = lamda[j] + num;
  }
  lamdaMax = num / c.cols;
  
 
  // Consistency Index
  let ci = (lamdaMax - c.cols) / (c.cols - 1);
  j = c.cols - 1;
  let cr = ci / ri[j];


  console.log(cr)


// 
var salles = await  Salle.findAll();  

var liste_materiaux = salles.map(salles=>({prix:salles.prix,capacite:salles.capacite, standing: salles.standing,niveau:salles.niveau_d_accesibilite}));

const dataArray = liste_materiaux.map(obj => [obj.prix, obj.capacite, obj.standing, obj.niveau]);


var matrix = new linearAlgebra.Matrix(dataArray);

//  matrice alternative * creterial weight 
var tab =[]

for (i = 0; i < 4;i += 1) {
   tab[i] =em.data[i][i]


}

console.log("nombre total "+liste_materiaux.length)


console.log("nombre ligne total "+matrix.rows)

console.log("nombre colone total "+matrix.cols)


for (i = 0; i < matrix.rows ;i += 1) {

  for (j = 0; j < matrix.cols;j += 1) {

    matrix.data[i][j]=   matrix.data[i][j] * tab[j]
    console.log(" "+ matrix.data[i][j]+" ")
}



const tableau_pair_wise_creteria_weigth = [];
 let somme = 0.0;
  i = 0;
  j = 0;
  for (i = 0; i < matrix.rows; i += 1) {
    for (j = 0; j < matrix.cols; j += 1) {
      somme = matrix.data[i][j] + somme;
     
    }
    console.log("l' index : "+ i +" a pour valeur "+ somme  )
  
    tableau_pair_wise_creteria_weigth.push(somme);
    num = 0;
  }

max= tableau_pair_wise_creteria_weigth[0]
  for (i = 0; i < tableau_pair_wise_creteria_weigth.length; i += 1) {

    if(max < tableau_pair_wise_creteria_weigth[i+1]){
      max=  tableau_pair_wise_creteria_weigth[i+1]
    }
    if(tableau_pair_wise_creteria_weigth[i+1] < max){
      max= max
    }

    console.log("max "+max)
    var index=i;

    for (i = 0; i < tableau_pair_wise_creteria_weigth.length; i += 1) {

      if(max === tableau_pair_wise_creteria_weigth[i]){
         index=i;

        console.log("index "+i)
      }
    }


    salle.nom=salles[index].nom
    salle.description=salles[index].description
    salle.prix= salles[index].prix
    salle.capacite= salles[index].capacite
    salle.standing= salles[index].standing 
    salle.niveau_d_accesibilite= salles[index].niveau_d_accesibilite
    
    console.log(""+salles[index].nom)
  



    return (salle)
    
  }

  
 




}



}catch (error) {
console.error('Une erreur s\'est produite lors de l\'envoi du message :', error);
}
}



