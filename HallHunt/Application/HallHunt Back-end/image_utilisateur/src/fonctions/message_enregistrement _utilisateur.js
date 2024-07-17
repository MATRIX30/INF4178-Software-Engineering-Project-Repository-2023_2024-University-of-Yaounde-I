
const amqp= require("amqplib/callback_api")

module.exports.message=  async function(ingenieur){



    amqp.connect(`amqp://localhost`, (err,connection)=>{
        if(err){
            throw err;
        }
    
        connection.createChannel((err,channel)=>{
            if(err){
                throw err
            }
    
            let queueName="nouvel utilisateur"

            let message = JSON.stringify(ingenieur)
           
            channel.assertQueue(queueName,{
                durable:false
            })
            channel.sendToQueue(queueName,Buffer.from(message));

            console.log("message :" +message )
    
            setTimeout(()=>{
                connection.close();
            },2000)
        })
    } )


}