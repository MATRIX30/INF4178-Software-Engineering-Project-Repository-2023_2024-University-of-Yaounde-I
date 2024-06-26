const jwt =require('jsonwebtoken');
const privatekey=require('../auth/private_key');

module.exports= {


    generetedTokenForUser: function(utilisateurs){
        return jwt.sign(
            {
                userId: utilisateurs.id
            },
            privatekey,
            {
                expiresIn:'1h'
            }
           
        )

       

    }

}

