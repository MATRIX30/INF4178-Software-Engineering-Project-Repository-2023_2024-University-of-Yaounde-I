// Importation des bibliothèques nécessaires
import 'package:dialog_flowtter/dialog_flowtter.dart';
import 'package:flutter/material.dart';
import 'package:task_app/Widgets/Messages.dart'; // Importation d'un fichier local Messages.dart
// import 'package:speech_to_text/speech_to_text.dart' as stt;

// La fonction principale qui lance l'application Flutter

// Définition de la classe principale MyApp


// Définition de la classe Home, qui est un widget Stateful
class MyAssistantBot extends StatefulWidget {
  const MyAssistantBot({Key? key}) : super(key: key);

  @override
  _MyAssistantBotState createState() => _MyAssistantBotState();
}

// État associé au widget Home
class _MyAssistantBotState extends State<MyAssistantBot> {
  late DialogFlowtter dialogFlowtter; // Instance de DialogFlowtter pour la communication avec Dialogflow
  final TextEditingController _controller = TextEditingController(); // Contrôleur pour le champ de texte
  bool _isInitialized = false; // Indicateur d'initialisation de DialogFlowtter
   bool _isSendingMessage=false;
  //  stt.SpeechToText _speech = stt.SpeechToText();
  // String _text = '';

  List<Map<String, dynamic>> messages = []; // Liste pour stocker les messages

  @override
  void initState() {
    super.initState();
    // Initialisation de DialogFlowtter à partir d'un fichier de configuration
    DialogFlowtter.fromFile().then((instance) {
      setState(() {
        dialogFlowtter = instance;
        _isInitialized = true; // Mise à jour de l'indicateur d'initialisation
      });
       _sendWelcomeMessage();
    });
    // _speech.initialize(onError: (error) => print(error));
  }

    void _sendWelcomeMessage() async {
    if (!_isInitialized) return; // Si DialogFlowtter n'est pas initialisé, quitter la méthode.
    // Envoi de l'événement "WELCOME" à Dialogflow.
    DetectIntentResponse response = await dialogFlowtter.detectIntent(
      queryInput: QueryInput(event: EventInput(name: "WELCOME", languageCode: "fr")),
    );
    if (response.message == null) return; // Si aucune réponse, quitter la méthode.
    setState(() {
      addMessage(response.message!); // Ajout du message de bienvenue à la liste des messages.
    });
  }



//  void startListening() {
//     _speech.listen(
//       onResult: (result) {
//         updateText(result.recognizedWords);
//       },
//       listenFor: Duration(seconds: 10),
//       // localeId: 'fr_FR', // Définir la langue en français
//     );
//   }

  // void stopListening() {
  //   _speech.stop();
  // }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).indicatorColor,
      appBar: AppBar(
        leading: Row(
          children: [
            IconButton(
              icon: const Icon(Icons.arrow_back_ios,
                  color: Color.fromARGB(255, 3, 161, 195)),
              onPressed: () {
                // Ajouter la logique pour naviguer vers la page précédente
                Navigator.of(context).pop();
              },
            ),
             
          ],
        ),
        title: Text('Assistant Task Bot', style: TextStyle(color:  Theme.of(context).iconTheme.color,fontSize: 20)),
       
         backgroundColor: Theme.of(context).indicatorColor,
        elevation: 2,
      ),



       body: Container(
        child: Column(
          children: [
            Expanded(child: MessagesScreen(messages: messages)), // Affichage des messages
            Container(
              padding: EdgeInsets.symmetric(horizontal: 14, vertical: 8),
             color: Theme.of(context).cardColor, // Couleur de fond de la zone de saisie
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _controller, // Contrôleur de texte
                      style: TextStyle(color: Theme.of(context).iconTheme.color,), // Style du texte
                      decoration : InputDecoration(
                           hintText: "Ecrire quelque chose",
                           hintStyle: TextStyle(color:Theme.of(context).iconTheme.color, fontSize: 14),
                      )
                    ),
                  ),
                  IconButton(
                    onPressed: _isInitialized
                        ? () {
                            sendMessage(_controller.text); // Envoi du message
                            _controller.clear(); // Effacement du champ de texte
                          }
                        : null,
                    icon: Icon(Icons.send,color:Theme.of(context).secondaryHeaderColor,), // Icône du bouton d'envoi
                  )
                ],
              ),
            )
          ],
        ),
      ),


      // body: Column(
      //   children: [
      //     Expanded(child: MessagesScreen(messages: messages)),
      //     Row(
      //       mainAxisAlignment: MainAxisAlignment.center,
      //       children: [
      //         if (_isSendingMessage)
      //           Container(
      //             width: 10,
      //             height: 10,
      //             margin: EdgeInsets.all(5),
      //             decoration: BoxDecoration(
      //               shape: BoxShape.circle,
      //               color: Colors.grey,
      //             ),
      //           ),
      //         if (_isSendingMessage)
      //           Container(
      //             width: 10,
      //             height: 10,
      //             margin: EdgeInsets.all(5),
      //             decoration: BoxDecoration(
      //               shape: BoxShape.circle,
      //               color: Colors.grey,
      //             ),
      //           ),
      //         if (_isSendingMessage)
      //           Container(
      //             width: 10,
      //             height: 10,
      //             margin: EdgeInsets.all(5),
      //             decoration: BoxDecoration(
      //               shape: BoxShape.circle,
      //               color: Colors.grey,
      //             ),
      //           ),
      //       ],
      //     ),
      //     Container(
      //       padding: EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      //       color: Colors.white,
      //       child: Row(
      //         children: [
      //           Expanded(
      //             child: TextField(
      //               controller: _controller,
      //               style: TextStyle(color: Colors.black),
      //               decoration: InputDecoration(
      //                 hintText: "Ecrire quelque chose",
      //                 hintStyle: TextStyle(color: Colors.black, fontSize: 14),
      //               ),
      //             ),
      //           ),
      //            IconButton(
      //           onPressed: startListening,
      //           icon: Icon(Icons.mic, color: Colors.black),
      //         ),
      //           IconButton(
      //             onPressed: _isInitialized
      //                 ? () {
      //                     setState(() {
      //                       _isSendingMessage = true; // Afficher les cercles de chargement
      //                     });
      //                     sendMessage(_controller.text).then((_) {
      //                       setState(() {
      //                         _isSendingMessage = false; // Masquer les cercles de chargement
      //                       });
      //                     });
      //                     _controller.clear();
      //                   }
      //                 : null,
      //             icon: Icon(Icons.send, color: Color.fromRGBO(242, 60, 224, 0.87)),
      //           ),
      //         ],
      //       ),
      //     ),
      //   ],
      // ),

    );
  }

  // Fonction pour envoyer un message
  sendMessage(String text) async {
    if (text.isEmpty) {
      print('Message is empty'); // Vérification si le message est vide
    } else {
      setState(() {
        addMessage(Message(text: DialogText(text: [text])), true); // Ajout du message de l'utilisateur à la liste
      });

      // Envoi de la requête à Dialogflow et attente de la réponse
      DetectIntentResponse response = await dialogFlowtter.detectIntent(
        queryInput: QueryInput(text: TextInput(text: text)),
      );
      if (response.message == null) return; // Si pas de réponse, on quitte la fonction
      setState(() {
        addMessage(response.message!); // Ajout du message de la réponse à la liste
      });
    }
  }

  // Fonction pour ajouter un message à la liste des messages
  addMessage(Message message, [bool isUserMessage = false]) {
    messages.add({'message': message, 'isUserMessage': isUserMessage}); // Ajout du message avec un indicateur s'il est de l'utilisateur ou non
  }
}











     