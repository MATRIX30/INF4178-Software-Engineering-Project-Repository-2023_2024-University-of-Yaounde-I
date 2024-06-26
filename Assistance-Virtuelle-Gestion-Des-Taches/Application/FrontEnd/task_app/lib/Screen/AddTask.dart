// ignore: file_names
import 'dart:async';
import 'dart:ffi';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:task_app/Models/Tache.dart';
import 'package:task_app/Models/User.dart';
import 'package:task_app/Services/TacheService.dart';
import 'package:task_app/Utils/Global.dart';
import 'package:task_app/Utils/Themes.dart';
import 'package:intl/intl.dart';
import 'package:task_app/Widgets/RappelDayWidget.dart';

class AddTask extends StatefulWidget {
  Tache? tache;
  AddTask({super.key, this.tache});

  @override
  State<AddTask> createState() => _AddTaskState(tache: tache);
}

class _AddTaskState extends State<AddTask> {
  Tache? tache;

  _AddTaskState({this.tache});

  final TextEditingController _nomController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final TextEditingController _heureDebutController = TextEditingController();
  final TextEditingController _heureFinController = TextEditingController();
  final TextEditingController _dateDebutController = TextEditingController();
  final TextEditingController _dateEcheanceController = TextEditingController();

  bool mondayS = false;
  bool tuesdayS = false;
  bool wednesdayS = false;
  bool thursdayS = false;
  bool fridayS = false;
  bool saturdayS = false;
  bool sundayS = false;

  bool okNom = false;
  bool okDescription = false;

  int _hours = 0;
  int _minutes = 0;
  Timer? _timer;
  final int _incrementInterval = 10000; // Interval in milliseconds

  void initialTime() {
    setState(() {
      //  _heureDebutController.text = _hours.toString().padLeft(2,'0') +
      //   ':' +
      //   _minutes.toString().padLeft(2,"0");
    });
  }

  void _updateTimeDisplay(String type) {
    setState(() {
      print("Les heures f: $_hours");
      print("Les minutes f: $_minutes");

      if (type == "deb") {
        if (_hours >= 10 && _minutes >= 10) {
          _heureDebutController.text =
              _hours.toString() + ':' + _minutes.toString();
        } else if (_hours < 10 && _minutes >= 10) {
          _heureDebutController.text =
              _hours.toString().padLeft(2, "0") + ':' + _minutes.toString();
        } else if (_hours >= 10 && _minutes < 10) {
          _heureDebutController.text =
              _hours.toString() + ':' + _minutes.toString().padLeft(2, "0");
        } else if (_hours < 10 && _minutes < 10) {
          print("Plus petit");
          _heureDebutController.text = _hours.toString().padLeft(2, "0") +
              ':' +
              _minutes.toString().padLeft(2, "0");
        }

        print(_heureDebutController.text);
      } else if (type == "fin") {
        if (_hours >= 10 && _minutes >= 10) {
          _heureFinController.text =
              _hours.toString() + ':' + _minutes.toString();
        } else if (_hours < 10 && _minutes >= 10) {
          _heureFinController.text =
              _hours.toString().padLeft(2, "0") + ':' + _minutes.toString();
        } else if (_hours >= 10 && _minutes < 10) {
          _heureFinController.text =
              _hours.toString() + ':' + _minutes.toString().padLeft(2, "0");
        } else if (_hours < 10 && _minutes < 10) {
          print("Plus petit");
          _heureFinController.text = _hours.toString().padLeft(2, "0") +
              ':' +
              _minutes.toString().padLeft(2, "0");
        }

        print(_heureFinController.text);
      }
    });
  }

  _incrementTime(TextEditingController controller, String type) {
    setState(() {
      print("Le debut");
      print(controller.text);
      _minutes = int.parse(controller.text.substring(3, 5));

      _hours = int.parse(controller.text.substring(0, 2));

      print("Les heures: $_hours");
      print("Les minutes: $_minutes");

      _minutes++;
      if (_minutes > 59) {
        _minutes = 0;
        _hours++;
        if (_hours > 23) {
          _hours = 0;
        }
      }
      print("After");
      print("Les heures: $_hours");
      print("Les minutes: $_minutes");
      _updateTimeDisplay(type);
    });
  }

  void _decrementTime(TextEditingController controller, String type) {
    setState(() {
      _minutes = int.parse(controller.text.substring(3, 5));

      _hours = int.parse(controller.text.substring(0, 2));
      _minutes--;
      if (_minutes < 0) {
        _minutes = 59;
        _hours--;
        if (_hours < 0) {
          _hours = 23;
        }
      }
      _updateTimeDisplay(type);
    });
  }

  void _startIncrementing(TextEditingController controller, String type) {
    _timer =
        Timer.periodic(Duration(milliseconds: _incrementInterval), (timer) {
      _incrementTime(controller, type);
    });
  }

  void _stopIncrementing() {
    if (_timer != null) {
      _timer!.cancel();
      _timer = null;
    }
  }

  void _startDecrementing(TextEditingController controller, String type) {
    print("Decrementation");
    _timer =
        Timer.periodic(Duration(milliseconds: _incrementInterval), (timer) {
      _decrementTime(controller, type);
    });
  }

  void _stopDecrementing() {
    if (_timer != null) {
      _timer!.cancel();
      _timer = null;
    }
  }

  _showSnackBar(String message, Color color) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
          width: 300,
          elevation: 5,
          behavior: SnackBarBehavior.floating,
          // action: SnackBarAction(
          //   label: 'Fermer',
          //   onPressed: () {},
          //   textcolor: Theme.of(context).cardColor,
          // ),
          dismissDirection: DismissDirection.down,
          backgroundColor: color,
          content: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                message,
                style:  TextStyle(
                    color: Colors.white, fontWeight: FontWeight.w500),
              ),
            ],
          )),
    );
  }

  clearValue() {
    setState(() {
      _nomController.clear();
      _descriptionController.clear();
    });
  }

  addNewTask() {
    String nom = _nomController.text.trim();
    String description = _descriptionController.text.trim();
    String dateDebut = _dateDebutController.text;
    String dateEcheance = _dateEcheanceController.text;
    String heureDebut = _heureDebutController.text.trim();
    String heureFin = _heureFinController.text;
    int idAccount = User.instance!.id;

    TacheService.createTask(nom, description, dateDebut, dateEcheance,
            heureDebut, heureFin, idAccount)
        .then((value) {
      if (value == "success") {
        _showSnackBar("Tache créée avec succès", Colors.green);
        clearValue();
      } else {
        _showSnackBar("Echec de création de la tache", Colors.red);
      }
    });
  }

  update() {
    String nom = _nomController.text.trim();
    String description = _descriptionController.text.trim();
    String dateDebut = _dateDebutController.text;
    String dateEcheance = _dateEcheanceController.text;
    String heureDebut = _heureDebutController.text;
    String heureFin = _heureFinController.text;
    int idAccount = User.instance!.id;

    TacheService.updateTask(tache!.id, nom, description, dateDebut,
            dateEcheance, heureDebut, heureFin, idAccount)
        .then((value) {
      if (value == "success") {
        clearValue();

        _showSnackBar("Tache modifiée avec succès", Colors.green);
        Navigator.pop(context);
        Navigator.pop(context);
      } else {
        _showSnackBar("Echec de modification", Colors.red);
      }
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();

    _dateDebutController.text =
        DateFormat('dd/MM/yyyy').format(DateTime.now()).toString();
    _dateEcheanceController.text =
        DateFormat('dd/MM/yyyy').format(DateTime.now()).toString();
    _heureDebutController.text = DateTime.now().toString().substring(11, 16);
    _heureFinController.text = DateTime.now().toString().substring(11, 16);
    initialTime();

    if(tache!=null){
      okNom=true;
      _nomController.text=tache!.nom;
      _descriptionController.text=tache!.description;
      _heureDebutController.text=tache!.heureDebut;
      _heureFinController.text=tache!.heureFin;
      _dateDebutController.text=tache!.dateDebut;
      _dateEcheanceController.text=tache!.dateFin;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).cardColor,
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
                decoration: BoxDecoration(
                  gradient:selectedTheme == "Thème clair"? LinearGradient(
                    colors: [Theme.of(context).focusColor, Colors.white],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ):LinearGradient(colors:  [Theme.of(context).focusColor,Theme.of(context).focusColor],),
                ),
                child: SingleChildScrollView(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            margin: const EdgeInsets.only(top: 35),
                            child: const Text(
                              "Ajouter une nouvelle tache",
                              style: TextStyle(
                                  fontSize: 25, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      Row(
                        children: [
                          Container(
                            margin: const EdgeInsets.only(
                                top: 25, left: 25, right: 25, bottom: 15),
                            child: const Text(
                              "Nom",
                              style: TextStyle(fontSize: 25),
                            ),
                          ),
                        ],
                      ),
                      Container(
                        margin: const EdgeInsets.only(
                          left: 25,
                          right: 25,
                        ),
                        decoration: BoxDecoration(
                          color: Theme.of(context).cardColor,
                          borderRadius: BorderRadius.circular(10),
                          //border: Border.all(color: Colors.black)
                        ),
                        child: TextFormField(
                          controller: _nomController,
                          onChanged: (value) {
                            okNom = value.isNotEmpty;
                          },
                          decoration: InputDecoration(
                            alignLabelWithHint: true,
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                            contentPadding: const EdgeInsets.symmetric(
                                horizontal: 100, vertical: 10),
                            hintStyle:
                                const TextStyle(fontStyle: FontStyle.italic),
                            hintText: "Nom de la tache",
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                              borderSide: const BorderSide(
                                color: Colors.black,
                                width: 1.0,
                              ),
                            ),
                            // enabledBorder: OutlineInputBorder(
                            //   borderSide: const BorderSide(
                            //     color: Colors.blue,
                            //     width: 1.5,
                            //   ),
                            //   borderRadius: BorderRadius.circular(10),
                            // ),
                            // focusedBorder: OutlineInputBorder(
                            //   borderSide: const BorderSide(
                            //     color: Colors.blue,
                            //     width: 1.5,
                            //   ),
                            //   borderRadius: BorderRadius.circular(10),
                            // ),
                            // disabledBorder: OutlineInputBorder(
                            //   borderSide: const BorderSide(
                            //     color: Colors.black,
                            //     width: 1.5,
                            //   ),
                            //   borderRadius: BorderRadius.circular(10),
                            // ),
                          ),
                        ),
                      ),
                      Row(
                        children: [
                          Container(
                            margin: const EdgeInsets.only(
                                top: 25, left: 25, right: 25, bottom: 15),
                            child: const Text(
                              "Description",
                              style: TextStyle(fontSize: 25),
                            ),
                          ),
                        ],
                      ),
                      Container(
                        margin: const EdgeInsets.only(
                            left: 25, right: 25, bottom: 10),
                        height: 120,
                        decoration: BoxDecoration(
                          color: Theme.of(context).cardColor,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: TextFormField(
                          keyboardType: TextInputType.multiline,
                          maxLength: 400,
                          maxLines: 50,
                          onChanged: (value) {
                            okDescription = value.isNotEmpty;
                          },
                          controller: _descriptionController,
                          decoration: InputDecoration(
                            counterText: "",
                            hintStyle:
                                const TextStyle(fontStyle: FontStyle.italic),
                            hintText: "Donner une description de votre tache",
                            alignLabelWithHint: true,
                            contentPadding: const EdgeInsets.symmetric(
                                horizontal: 40, vertical: 10),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                              borderSide: const BorderSide(
                                color: Colors.black,
                                width: 1.0,
                              ),
                            ),
                            // enabledBorder: OutlineInputBorder(
                            //   borderSide: const BorderSide(
                            //     color: Colors.blue,
                            //     width: 1.5,
                            //   ),
                            //   borderRadius: BorderRadius.circular(10),
                            // ),
                            // focusedBorder: OutlineInputBorder(
                            //   borderSide: const BorderSide(
                            //     color: Colors.blue,
                            //     width: 1.5,
                            //   ),
                            //   borderRadius: BorderRadius.circular(10),
                            // ),
                            // disabledBorder: OutlineInputBorder(
                            //   borderSide: const BorderSide(
                            //     color: Colors.black,
                            //     width: 1.5,
                            //   ),
                            //   borderRadius: BorderRadius.circular(10),
                            // ),
                          ),
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            margin: const EdgeInsets.only(
                                top: 25, left: 25, bottom: 15),
                            child: const Text(
                              "Heure de debut",
                              style: TextStyle(fontSize: 20),
                            ),
                          ),
                          Container(
                            margin: const EdgeInsets.only(
                                top: 25, right: 35, bottom: 15),
                            child: const Text(
                              "Heure de fin",
                              style: TextStyle(fontSize: 20),
                            ),
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Stack(
                            children: [
                              Container(
                                margin: const EdgeInsets.only(
                                  left: 25,
                                  right: 0,
                                ),
                                width: MediaQuery.of(context).size.width * 0.35,
                                decoration: BoxDecoration(
                                  color: Theme.of(context).cardColor,
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: Row(
                                  children: [
                                    Expanded(
                                      child: TextFormField(
                                        controller: _heureDebutController,
                                        onTap: () async {
                                          TimeOfDay? pickedTime =
                                              await showTimePicker(
                                            context: context,
                                            initialTime: TimeOfDay(
                                                hour: int.parse(
                                                    _heureDebutController.text
                                                        .substring(0, 2)),
                                                minute: int.parse(
                                                    _heureDebutController.text
                                                        .substring(3, 5))),
                                          );

                                          if (pickedTime != null) {
                                            String formattedTime =
                                                DateFormat.Hm().format(DateTime(
                                                    2020,
                                                    1,
                                                    1,
                                                    pickedTime.hour,
                                                    pickedTime.minute));

                                            setState(() {
                                              _heureDebutController.text =
                                                  formattedTime;
                                            });
                                          }
                                        },
                                        readOnly: true,
                                        decoration: InputDecoration(
                                          hintStyle: const TextStyle(
                                              fontStyle: FontStyle.italic),
                                          hintText: "Heure de deb",
                                          border: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(10),
                                          ),
                                          enabledBorder: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(10),
                                            borderSide: const BorderSide(
                                              color: Colors.black,
                                              width: 1.0,
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Container(
                                margin: const EdgeInsets.only(
                                  left: 140,
                                  top: 5,
                                  right: 0,
                                ),
                                child: Column(
                                  children: [
                                    GestureDetector(
                                      onTap: () {
                                        _incrementTime(
                                            _heureDebutController, "deb");
                                      },
                                      onLongPressStart: (_) =>
                                          _startIncrementing(
                                              _heureDebutController, "deb"),
                                      onLongPressEnd: (_) =>
                                          _stopIncrementing(),
                                      child: Container(
                                        width: 20,
                                        decoration: BoxDecoration(
                                          color: FIRST_THEME_COLOR,
                                          shape: BoxShape.circle,
                                        ),
                                        child:  Icon(
                                          Icons.arrow_drop_up,
                                          color: Theme.of(context).cardColor,
                                          size: 20,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(
                                      height: 10,
                                    ),
                                    GestureDetector(
                                      onTap: () {
                                        _decrementTime(
                                            _heureDebutController, "deb");
                                      },
                                      onLongPressStart: (_) =>
                                          _startDecrementing(
                                              _heureDebutController, "deb"),
                                      onLongPressEnd: (_) =>
                                          _stopDecrementing(),
                                      child: Container(
                                        width: 20,
                                        decoration: BoxDecoration(
                                          color: FIRST_THEME_COLOR,
                                          shape: BoxShape.circle,
                                        ),
                                        child:  Icon(
                                          Icons.arrow_drop_down,
                                          color: Theme.of(context).cardColor,
                                          size: 20,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          Stack(
                            children: [
                              Container(
                                //height: 65,
                                margin: const EdgeInsets.only(
                                  left: 0,
                                  right: 25,
                                ),
                                width: MediaQuery.of(context).size.width * 0.35,
                                decoration: BoxDecoration(
                                  color: Theme.of(context).cardColor,
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: Row(
                                  children: [
                                    Expanded(
                                      child: TextFormField(
                                        controller: _heureFinController,
                                        onTap: () async {
                                          TimeOfDay? pickedTime =
                                              await showTimePicker(
                                            context: context,
                                            initialTime: TimeOfDay(
                                                hour: int.parse(
                                                    _heureFinController.text
                                                        .substring(0, 2)),
                                                minute: int.parse(
                                                    _heureFinController.text
                                                        .substring(3, 5))),
                                          );

                                          if (pickedTime != null) {
                                            String formattedTime =
                                                DateFormat.Hm().format(DateTime(
                                                    2020,
                                                    1,
                                                    1,
                                                    pickedTime.hour,
                                                    pickedTime.minute));

                                            setState(() {
                                              _heureFinController.text =
                                                  formattedTime;
                                            });
                                          }
                                        },
                                        readOnly: true,
                                        decoration: InputDecoration(
                                          hintStyle: const TextStyle(
                                              fontStyle: FontStyle.italic),
                                          hintText: "Heure de fin",
                                          border: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(10),
                                          ),

                                          enabledBorder: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(10),
                                            borderSide: const BorderSide(
                                              color: Colors.black,
                                              width: 1.0,
                                            ),
                                          ),
                                          // suffix: Column(
                                          //   // mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                          //   children: [

                                          //   ],
                                          // )
                                        ),
                                      ),
                                    )
                                  ],
                                ),
                              ),
                              Container(
                                margin: const EdgeInsets.only(
                                  left: 115,
                                  top: 5,
                                  right: 0,
                                ),
                                child: Column(
                                  children: [
                                    GestureDetector(
                                      onTap: () {
                                        _incrementTime(
                                            _heureFinController, "fin");
                                      },
                                      onLongPressStart: (_) =>
                                          _startIncrementing(
                                              _heureFinController, "fin"),
                                      onLongPressEnd: (_) =>
                                          _stopIncrementing(),
                                      child: Container(
                                        width: 20,
                                        decoration: BoxDecoration(
                                          color: FIRST_THEME_COLOR,
                                          shape: BoxShape.circle,
                                        ),
                                        child:  Icon(
                                          Icons.arrow_drop_up,
                                          color: Theme.of(context).cardColor,
                                          size: 20,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(
                                      height: 10,
                                    ),
                                    GestureDetector(
                                      onTap: () {
                                        _decrementTime(
                                            _heureFinController, "fin");
                                      },
                                      onLongPressStart: (_) =>
                                          _startDecrementing(
                                              _heureFinController, "fin"),
                                      onLongPressEnd: (_) =>
                                          _stopDecrementing(),
                                      child: Container(
                                        width: 20,
                                        decoration: BoxDecoration(
                                          color: FIRST_THEME_COLOR,
                                          shape: BoxShape.circle,
                                        ),
                                        child:  Icon(
                                          Icons.arrow_drop_down,
                                          color: Theme.of(context).cardColor,
                                          size: 20,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              )
                            ],
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            margin: const EdgeInsets.only(
                                top: 25, left: 25, bottom: 15),
                            child: const Text(
                              "Date de debut",
                              style: TextStyle(fontSize: 20),
                            ),
                          ),
                          Container(
                            margin: const EdgeInsets.only(
                                top: 25, right: 35, bottom: 15),
                            child: const Text(
                              "Date d'echeance",
                              style: TextStyle(fontSize: 20),
                            ),
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            margin: const EdgeInsets.only(
                              left: 25,
                              right: 0,
                            ),
                            width: MediaQuery.of(context).size.width * 0.35,
                            decoration: BoxDecoration(
                              color: Theme.of(context).cardColor,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Row(
                              children: [
                                Expanded(
                                  child: TextFormField(
                                    readOnly: true,
                                    onTap: () async {
                                      DateTime? pickedDate = await showDatePicker(
                                          context: context,
                                          initialDate: DateTime.now(),
                                          firstDate: DateTime.now(),
                                          //DateTime.now() - not to allow to choose before today.
                                          lastDate: DateTime(2050));

                                      if (pickedDate != null) {
                                        String formattedDate =
                                            DateFormat('dd/MM/yyyy')
                                                .format(pickedDate);

                                        setState(() {
                                          _dateDebutController.text =
                                              formattedDate; //set output date to TextField value.
                                        });
                                      }
                                    },
                                    controller: _dateDebutController,
                                    decoration: InputDecoration(
                                        hintStyle: const TextStyle(
                                            fontStyle: FontStyle.italic),
                                        hintText: "Debut",
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                        ),
                                        enabledBorder: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                          borderSide: const BorderSide(
                                            color: Colors.black,
                                            width: 1.0,
                                          ),
                                        ),
                                        suffixIcon: Icon(
                                          Icons.calendar_month_sharp,
                                          color: FIRST_THEME_COLOR,
                                        )),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Container(
                            margin: const EdgeInsets.only(
                              left: 0,
                              right: 25,
                            ),
                            width: MediaQuery.of(context).size.width * 0.35,
                            decoration: BoxDecoration(
                              color: Theme.of(context).cardColor,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Row(
                              children: [
                                Expanded(
                                  child: TextFormField(
                                    controller: _dateEcheanceController,
                                    readOnly: true,
                                    onTap: () async {
                                      DateTime? pickedDate =
                                          await showDatePicker(
                                              context: context,
                                              initialDate: DateTime.now(),
                                              firstDate: DateTime.now(),
                                              lastDate: DateTime(2050));

                                      if (pickedDate != null) {
                                        String formattedDate =
                                            DateFormat('dd/MM/yyyy')
                                                .format(pickedDate);

                                        setState(() {
                                          _dateEcheanceController.text =
                                              formattedDate; //set output date to TextField value.
                                        });
                                      }
                                    },
                                    decoration: InputDecoration(
                                        enabledBorder: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                          borderSide: const BorderSide(
                                            color: Colors.black,
                                            width: 1.0,
                                          ),
                                        ),
                                        hintStyle: const TextStyle(
                                            fontStyle: FontStyle.italic),
                                        hintText: "Echeance",
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                        ),
                                        suffixIcon: Icon(
                                          Icons.calendar_month_sharp,
                                          color: FIRST_THEME_COLOR,
                                        )),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 70,
                      ),
                      InkWell(
                        onTap: () {
                          rappels();
                        },
                        child: Container(
                          width: 115,
                          height: 60,
                          //margin: EdgeInsets.only(left: 20,right: 20),
                          decoration: BoxDecoration(
                              color: FIRST_THEME_COLOR,
                              borderRadius: BorderRadius.circular(10)),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children:  [
                              Icon(
                                Icons.notification_add_outlined,
                                color: Theme.of(context).cardColor,
                              ),
                              SizedBox(
                                width: 10,
                              ),
                              Text(
                                "Rappel",
                                style: TextStyle(
                                    color: Theme.of(context).cardColor,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 17),
                              ),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 40,
                      ),
                      Visibility(
                        visible: isVisibleSaveTask,
                        child: InkWell(
                          onTap: () {
                            if (okNom) {
                              addNewTask();
                            } else {
                              _showSnackBar("Veuillez donner un nom", Colors.red);
                            }
                      
                            print(
                                "les valeurs: lundi $mondayS, mardi $tuesdayS mercredi $wednesdayS jeudi $thursdayS");
                          },
                          child: Container(
                            width: 200,
                            height: 60,
                            //margin: EdgeInsets.only(left: 20,right: 20),
                            decoration: BoxDecoration(
                                color: FIRST_THEME_COLOR,
                                borderRadius: BorderRadius.circular(10)),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children:  [
                                Icon(
                                  Icons.star_rate,
                                  color: Theme.of(context).cardColor,
                                ),
                                SizedBox(
                                  width: 10,
                                ),
                                Text(
                                  "Enregistrer",
                                  style: TextStyle(
                                      color: Theme.of(context).cardColor,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 17),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),

                      Visibility(
                        visible: isVisibleUpdateTask,
                        child: InkWell(
                          onTap: () {
                            if (okNom) {
                            update();
                          } else {
                            _showSnackBar("Veuillez donner un nom", Colors.red);
                          }
                          },
                          child:
                          
                           Container(
                            width: 200,
                            height: 60,
                            //margin: EdgeInsets.only(left: 20,right: 20),
                            decoration: BoxDecoration(
                                color: FIRST_THEME_COLOR,
                                borderRadius: BorderRadius.circular(10)),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children:  [
                                Icon(
                                  Icons.star_rate,
                                  color: Theme.of(context).cardColor,
                                ),
                                SizedBox(
                                  width: 10,
                                ),
                                Text(
                                  "Modifier",
                                  style: TextStyle(
                                      color: Theme.of(context).cardColor,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 17),
                                ),
                              ],
                            ),
                          ),
                      
                          
                        ),
                      ),
                      //  const SizedBox(
                      //   height: 40,
                      // ),
                      // ElevatedButton.icon(
                      //   style: ButtonStyle(
                      //     fixedSize: MaterialStateProperty.all(),
                      //     backgroundColor: MaterialStateProperty.all(FIRST_THEME_COLOR)
                      //   ),

                      //   onPressed: (() {

                      // }), icon: Icon(Icons.notifications), label: Text("Rappels"))
                    ],
                  ),
                )),
          ],
        ),
      ),
    );
  }

  void rappels() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
          title: Container(
              height: 60,
              child: Column(
                children: [
                  Row(
                    children: [
                      Icon(
                        Icons.notifications_outlined,
                        color: FIRST_THEME_COLOR,
                      ),
                      const SizedBox(
                        width: 10,
                      ),
                       Text(
                        "Rappel",
                        style: TextStyle(color: Theme.of(context).iconTheme.color, fontSize: 20),
                      )
                    ],
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Row(
                    children: [
                      Text(
                        "Heure de debut : ${_heureDebutController.text}",
                        style:
                            const TextStyle(color: Colors.grey, fontSize: 20),
                      ),
                    ],
                  ),
                ],
              )),
          content: SizedBox(
            width: 400,
            height: 150,
            child: SingleChildScrollView(
              child: Column(
                children: [
                  const SizedBox(
                    height: 10,
                  ),
                  Row(
                    children: [
                      Icon(
                        Icons.verified,
                        color: FIRST_THEME_COLOR,
                      ),
                      const SizedBox(
                        width: 10,
                      ),
                       Text(
                        "Repeter",
                        style: TextStyle(color: Theme.of(context).iconTheme.color, fontSize: 20),
                      )
                    ],
                  ),
                  const SizedBox(
                    height: 15,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      InkWell(
                        onTap: () {
                          print("selected monday");
                          setState(() {
                            mondayS = !mondayS;
                          });
                        },
                        child: RappelDay(
                          selected: mondayS,
                          letter: "L",
                        ),
                      ),
                      InkWell(
                        onTap: () {
                          setState(() {
                            tuesdayS = !tuesdayS;
                          });
                        },
                        child: RappelDay(
                          selected: tuesdayS,
                          letter: "M",
                        ),
                      ),
                      InkWell(
                        onTap: () {
                          setState(() {
                            wednesdayS = !wednesdayS;
                          });
                        },
                        child: RappelDay(
                          selected: wednesdayS,
                          letter: "M",
                        ),
                      ),
                      InkWell(
                        onTap: () {
                          setState(() {
                            thursdayS = !thursdayS;
                          });
                        },
                        child: RappelDay(
                          selected: thursdayS,
                          letter: "J",
                        ),
                      ),
                      InkWell(
                        onTap: () {
                          setState(() {
                            fridayS = !fridayS;
                          });
                        },
                        child: RappelDay(
                          selected: fridayS,
                          letter: "V",
                        ),
                      ),
                      InkWell(
                        onTap: () {
                          setState(() {
                            saturdayS = !saturdayS;
                          });
                        },
                        child: RappelDay(
                          selected: saturdayS,
                          letter: "S",
                        ),
                      ),
                      InkWell(
                        onTap: () {
                          setState(() {
                            sundayS = !sundayS;
                          });
                        },
                        child: RappelDay(
                          selected: sundayS,
                          letter: "D",
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(
                    height: 25,
                  ),
                  Row(
                    children: [
                      Icon(
                        Icons.notifications_active_outlined,
                        color: FIRST_THEME_COLOR,
                      ),
                      const SizedBox(
                        width: 10,
                      ),
                       Text(
                        "SON 1",
                        style: TextStyle(color: Theme.of(context).iconTheme.color, fontSize: 20),
                      ),
                      const Text(
                        " (Par defaut)",
                        style: TextStyle(color: Colors.grey, fontSize: 20),
                      )
                    ],
                  ),
                ],
              ),
            ),
          ),
          actions: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                InkWell(
                  onTap: () {
                    Navigator.pop(context);
                  },
                  child: Container(
                    width: 170,
                    height: 50,
                    decoration: BoxDecoration(
                        color: Theme.of(context).cardColor,
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: FIRST_THEME_COLOR)),
                    child: Center(
                        child: Text(
                      "Terminer",
                      style: TextStyle(color: FIRST_THEME_COLOR, fontSize: 20),
                    )),
                  ),
                )
              ],
            )
          ],
        );
      },
    );
  }
}
