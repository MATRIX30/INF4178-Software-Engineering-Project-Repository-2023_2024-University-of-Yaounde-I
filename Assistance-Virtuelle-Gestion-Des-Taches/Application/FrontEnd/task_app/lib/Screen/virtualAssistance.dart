// ignore_for_file: avoid_print, prefer_typing_uninitialized_variables

import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:speech_to_text/speech_recognition_result.dart';
import 'package:speech_to_text/speech_to_text.dart';
import 'package:task_app/Utils/Global.dart';
import 'package:task_app/Utils/Themes.dart';
import 'package:task_app/Widgets/WaveProgress.dart';

class VirtualAssistance extends StatefulWidget {
  const VirtualAssistance({super.key});

  @override
  State<VirtualAssistance> createState() => _VirtualAssistanceState();
}

class _VirtualAssistanceState extends State<VirtualAssistance> {
  final SpeechToText _speechToText = SpeechToText();
  bool _speechEnabled = false;
  String _lastWords = '';
  bool okRecord = false;

  bool okFind = false;
  bool okTraitment = false;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _initSpeech();
  }

  void _initSpeech() async {
    print('Requesting microphone permission...');
    var status = await Permission.microphone.status;
    if (!status.isGranted) {
      status = await Permission.microphone.request();
    }

    if (status.isGranted) {
      print('Microphone permission granted');

      print('Speech recognition supported');
      _speechEnabled = await _speechToText.initialize();
      if (_speechEnabled) {
        print('Speech recognition initialized');
      } else {
        print('Failed to initialize speech recognition');
      }
    } else {
      print('Microphone permission denied');
      _speechEnabled = false;
    }
    setState(() {});
  }

  void _startListening() async {
    if (_speechEnabled) {
      print("le mot: $_lastWords");
      await _speechToText.listen(onResult: _onSpeechResult);
      setState(() {});
      print("le mot: $_lastWords");
    } else {
      print('Speech recognition is not enabled');
    }
  }

  void _stopListening() async {
    await _speechToText.stop();
    setState(() {});
  }

  var volume;

  void _onSpeechResult(SpeechRecognitionResult result) {
    setState(() {
      _lastWords = result.recognizedWords;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: Column(
        children: [
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.9,
            child: Column(
              //mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                const SizedBox(
                  height: 100,
                ),
                Visibility(
                  visible: !okRecord && !okTraitment,
                  child: const Center(
                    child: SizedBox(
                      width: 300,
                      height: 350,
                      child: Image(
                        image: AssetImage("assets/images/hello.png"),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                ),
                Visibility(
                  visible: okTraitment && !okRecord && !okFind,
                  child: const Center(
                    child: SizedBox(
                        width: 300,
                        height: 350,
                        child: CircularProgressIndicator()),
                  ),
                ),
                Visibility(
                  visible: !okTraitment && !okFind && okRecord,
                  child: Center(
                    child: SizedBox(
                        width: 300, height: 350, child: RecordingIndicator()),
                  ),
                ),
                const SizedBox(
                  height: 100,
                ),
                Visibility(
                  visible: !okRecord && !okTraitment && !okFind,
                  child: Center(
                    child: Text(
                      "Give me an order ...",
                      style: Theme.of(context)
                          .textTheme
                          .bodyText1
                          ?.copyWith(fontSize: 25),
                    ),
                  ),
                ),
                Visibility(
                  visible: okRecord && !okFind && !okTraitment,
                  child:  Center(
                    child: Text(
                      "Appuyez pour interrompre ...",
                      style: Theme.of(context)
                          .textTheme
                          .bodyText1
                          ?.copyWith(fontSize: 25),
                    ),
                  ),
                ),
                Visibility(
                  visible: !okRecord && !okFind && okTraitment,
                  child:  Center(
                    child: Text(
                      "Nous traitons votre requete ...",
                      style: Theme.of(context)
                          .textTheme
                          .bodyText1
                          ?.copyWith(fontSize: 25),
                    ),
                  ),
                ),
                Visibility(
                  visible: okFind && !okRecord && !okTraitment,
                  child: Container(
                    margin: const EdgeInsets.only(top: 12, left: 10, right: 10),
                    decoration: BoxDecoration(
                      border: Border.all(color: SECOND_THEME_COLOR),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: InkWell(
                      onTap: () {
                        setState(() {
                          okTraitment = true;
                          okFind = false;
                          okRecord = false;
                        });
                      },
                      child: ListTile(
                        title: Container(
                          margin: const EdgeInsets.only(left: 10),
                          child: Text(
                            _lastWords,
                            style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: FIRST_THEME_COLOR),
                          ),
                        ),
                        trailing:  Icon(
                          Icons.verified,
                          color: Theme.of(context).iconTheme.color,
                          size: 30,
                        ),
                      ),
                    ),
                  ),
                )
              ],
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              InkWell(
                onTap: () {
                  print("On arrete");
                  setState(() {
                    okFind = true;
                    okRecord = false;
                    okTraitment = false;
                  });
                  _stopListening();
                },
                child: Container(
                  width: 60,
                  height: 60,
                  //margin: const EdgeInsets.only(left: 20),
                  decoration: const BoxDecoration(
                      shape: BoxShape.circle,
                      color: Color.fromARGB(255, 50, 50, 50)),
                  child: Center(
                    child: Container(
                      width: 25,
                      height: 25,
                      decoration:  BoxDecoration(
                          color:Theme.of(context).iconTheme.color, shape: BoxShape.circle),
                      child:  Icon(
                        Icons.stop,
                        color: Theme.of(context).scaffoldBackgroundColor,
                        size: 25,
                      ),
                    ),
                  ),
                ),
              ),
              Visibility(
                child: InkWell(
                  onTap: () {
                    if (_speechToText.isNotListening) {
                      print("On enregistre");
                      setState(() {
                        okFind = false;
                        okRecord = true;
                        okTraitment = false;
                      });
                      _startListening();
                    }
                  },
                  child: Container(
                    width: 60,
                    height: 60,
                    decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(color: Theme.of(context).iconTheme.color!,)),
                    child:  Image(
                      image: selectedTheme == "Thème clair"? const AssetImage("assets/images/record2.png"):const AssetImage("assets/images/record.png"),
                    ),
                  ),
                ),
              ),
              InkWell(
                onTap: () {
                  setState(() {
                    print("on ferme tout");
                    okFind = false;
                    okRecord = false;
                    okTraitment = false;
                  });

                  Navigator.pop(context);
                },
                child: Container(
                    width: 60,
                    height: 60,
                    decoration: const BoxDecoration(
                      color: Colors.red,
                      shape: BoxShape.circle,
                      //border: Border.all(color: Colors.red)
                    ),
                    child:  Icon(
                      Icons.close,
                      color: Theme.of(context).iconTheme.color,
                    )),
              )
            ],
          )
        ],
      ),
    );
  }
}
