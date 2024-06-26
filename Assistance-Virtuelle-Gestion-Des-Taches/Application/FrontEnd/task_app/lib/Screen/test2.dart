// import 'package:flutter/material.dart';

// import 'package:flutter_tts/flutter_tts.dart';


// class SpeakTest extends StatefulWidget {
//   const SpeakTest({super.key});

//   @override
//   State<SpeakTest> createState() => _SpeakTestState();
// }

// class _SpeakTestState extends State<SpeakTest> {
//   final FlutterTts flutterTts = FlutterTts();
//   String textToSpeak = '';

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('Text to Speech'),
//       ),
//       body: Center(
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: <Widget>[
//             TextField(
//               onChanged: (value) {
//                 textToSpeak = value;
//               },
//               decoration: InputDecoration(
//                 hintText: 'Entrez le texte à lire',
//               ),
//             ),
//             SizedBox(height: 20),
//             ElevatedButton(
//               onPressed: () {
//                 speakText();
//               },
//               child: Text('Lire à voix haute'),
//             ),
//           ],
//         ),
//       ),
//     );
//   }

//   Future<void> speakText() async {
//     await flutterTts.setLanguage('fr-FR');
//     await flutterTts.setSpeechRate(0.5);
//     await flutterTts.setVolume(1.0);
//     await flutterTts.speak(textToSpeak);
//   }
// }