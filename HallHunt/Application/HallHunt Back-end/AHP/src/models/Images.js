
module.exports = (sequelize,DataTypes)=> {

    return sequelize.define('images',
    {
         
        
        id_images:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        id_salle:{
            type: DataTypes.INTEGER,
            allowNull:false,
           
        },
        nom: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: {msg: 'Le nom ne doit pas être vide'},
                notNull: {msg: 'Le nom  est une propriété requise'}
              }
        },
       
    path:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
           msg: 'ce texte est deja pris' 
        },
    
    }, 
     

    chemin:{
        type: DataTypes.TEXT,
       
        unique:{
           msg: 'ce chemin  est deja pris' 
        },
    }, 
    
    
    
 
   
   

},
{
    timestamps:true,
    createdAt:'date_img',
    updatedAt:false
}
    )}