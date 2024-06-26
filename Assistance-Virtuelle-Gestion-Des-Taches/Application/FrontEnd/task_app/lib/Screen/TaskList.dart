// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:task_app/Models/Tache.dart';
import 'package:task_app/Models/User.dart';
import 'package:task_app/Screen/AddTask.dart';
import 'package:task_app/Services/TacheService.dart';
import 'package:task_app/Utils/Global.dart';
import 'package:task_app/Utils/Themes.dart';

class TaskListScreen extends StatefulWidget {
  String typeList;
  TaskListScreen({super.key, required this.typeList});

  @override
  State<TaskListScreen> createState() =>
      _TaskListScreenState(typeList: typeList);
}

class _TaskListScreenState extends State<TaskListScreen> {
  String? typeList;
  _TaskListScreenState({this.typeList});

  String? initial;

  List<Tache> listAllTask = <Tache>[];

  List<Tache> listTask = <Tache>[];

  getTaskList(String typeList) {
    if (typeList == "all") {
      TacheService.getAllTaches(User.instance!.id).then((value) {
        setState(() {
          listTask = value;
        });
      });
    } else if (typeList == "finished") {
      TacheService.getAllTachesTermines(User.instance!.id).then((value) {
        setState(() {
          listTask = value;
        });
      });
    } else if (typeList == "important") {
      TacheService.getAllTachesImportantes(User.instance!.id).then((value) {
        setState(() {
          listTask = value;
        });
      });
    } else if (typeList == "urgente") {
      TacheService.getAllTachesUrgentes(User.instance!.id).then((value) {
        setState(() {
          listTask = value;
        });
      });
    } else if (typeList == "alphabetique") {
      TacheService.getAllTachesOrdreAlphabetique(User.instance!.id)
          .then((value) {
        setState(() {
          listTask = value;
        });
      });
    } else if (typeList == "urgenteAlphabetique") {
      TacheService.getAllTachesOrdreAlphabetique(User.instance!.id)
          .then((value) {
        setState(() {
          listTask = value;
          print(listTask.length);
          listTask.removeWhere(
              (element) => element.importante >= 0 && element.urgente == 0);
          print(listTask.length);
        });
      });
    } else if (typeList == "importantAlphabetique") {
      TacheService.getAllTachesOrdreAlphabetique(User.instance!.id)
          .then((value) {
        setState(() {
          listTask = value;
          print("Liste avant ${listTask.length}");
          listTask.removeWhere(
              (element) => element.importante == 0 && element.urgente >= 0);
          print("Liste apres ${listTask.length}");
        });
      });
    } else if (typeList == "dateCreation") {
      TacheService.getAllTachesParDateCreation(User.instance!.id).then((value) {
        setState(() {
          listTask = value;
        });
      });
    } else if (typeList == "urgenteDateCreation") {
      TacheService.getAllTachesParDateCreation(User.instance!.id).then((value) {
        setState(() {
          listTask = value;
          listTask.removeWhere(
              (element) => element.importante >= 0 && element.urgente == 0);
        });
      });
    } else if (typeList == "importantDateCreation") {
      TacheService.getAllTachesParDateCreation(User.instance!.id).then((value) {
        setState(() {
          listTask = value;
          listTask.removeWhere(
              (element) => element.importante == 0 && element.urgente >= 0);
        });
      });
    } else if (typeList == "dateEcheance") {
      TacheService.getAllTachesParDateEcheance(User.instance!.id).then((value) {
        setState(() {
          listTask = value;
        });
      });
    } else if (typeList == "urgenteDateEcheance") {
      TacheService.getAllTachesParDateEcheance(User.instance!.id).then((value) {
        setState(() {
          listTask = value;
          listTask.removeWhere(
              (element) => element.importante >= 0 && element.urgente == 0);
        });
      });
    } else if (typeList == "importantDateEcheance") {
      TacheService.getAllTachesParDateEcheance(User.instance!.id).then((value) {
        setState(() {
          listTask = value;
          listTask.removeWhere(
              (element) => element.importante == 0 && element.urgente >= 0);
        });
      });
    } else if (typeList == "heure") {
      TacheService.getAllTachesParHeure(User.instance!.id).then((value) {
        setState(() {
          listTask = value;
        });
      });
    } else if (typeList == "urgenteHeure") {
      TacheService.getAllTachesParHeure(User.instance!.id).then((value) {
        setState(() {
          listTask = value;
          listTask.removeWhere(
              (element) => element.importante >= 0 && element.urgente == 0);
        });
      });
    } else if (typeList == "importantHeure") {
      TacheService.getAllTachesParHeure(User.instance!.id).then((value) {
        setState(() {
          listTask = value;
          listTask.removeWhere(
              (element) => element.importante == 0 && element.urgente >= 0);
        });
      });
    } else if (typeList == "TermineeImportantes") {
      TacheService.getAllTachesTermineeImportantes(User.instance!.id)
          .then((value) {
        setState(() {
          listTask = value;
        });
      });
    } else if (typeList == "TermineeUrgentes") {
      TacheService.getAllTachesTerminneesUrgentes(User.instance!.id)
          .then((value) {
        setState(() {
          listTask = value;
        });
      });
    }
  }

  setTaskImportante(idTask, isImportant) {
    TacheService.setTaskImportant(idTask, isImportant).then((value) {
      if (value == "success") {
        print("importance ok");
        getTaskList(typeList!);
      } else {
        print("importance echec");
      }
    });
  }

  setTaskTermine(idTask) {
    TacheService.setTaskTerminee(idTask).then((value) {
      if (value == "success") {
        print("termine ok");
        getTaskList(typeList!);
      } else {
        print("termine echec");
      }
    });
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
          //   textColor: Colors.white,
          // ),
          dismissDirection: DismissDirection.down,
          backgroundColor: color,
          content: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                message,
                style: const TextStyle(
                    color: Colors.white, fontWeight: FontWeight.w500),
              ),
            ],
          )),
    );
  }

  deleteTask(idTask) {
    TacheService.deleteTask(idTask).then((value) {
      if (value == "success") {
        _showSnackBar("Tache suppprimée avec succès", Colors.green);
        getTaskList(typeList!);
      } else {
        _showSnackBar("Echec de suppression de la tache", Colors.red);
      }
    });
  }

  bool okTri = false;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    initial = typeList;

    getTaskList(typeList!);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        leadingWidth: 200,
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
            Text('Back',
                style: Theme.of(context).textTheme.bodyText1?.copyWith(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    )),
          ],
        ),
        actions: [
          Visibility(
            visible: okTri,
            child: InkWell(
                onTap: () {
                  _showSort();
                  // setState(() {
                  //   okTri = !okTri;
                  // });
                },
                child: Container(
                  width: 130,
                  //height: 2,
                  decoration: BoxDecoration(
                    color: FIRST_THEME_COLOR,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Image.asset(
                        'assets/images/sort.png',
                        height: 30,
                        width: 32,
                      ),
                      const SizedBox(
                        width: 10,
                      ),
                      const Text(
                        "Trier par",
                        style: TextStyle(
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                            fontSize: 15),
                      )
                    ],
                  ),
                )),
          ),
          Visibility(
            visible: !okTri,
            child: InkWell(
              onTap: () {
                // _showSort();
                setState(() {
                  okTri = true;
                });
              },
              child: Container(
                margin: EdgeInsets.only(right: 10),
                child: Icon(
                  Icons.more_vert,
                  color: FIRST_THEME_COLOR,
                ),
              ),
            ),
          ),
        ],
      ),
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: Container(
          child: Column(
        children: [
          const SizedBox(
            height: 10,
          ),
          Row(
            children: [
              const SizedBox(
                width: 10,
              ),
              Text(
                typeList == "all"
                    ? "Toutes les taches"
                    : typeList == "finished"
                        ? "Toutes les taches terminées"
                        : typeList == "important"
                            ? "Toutes les taches importantes"
                            : typeList == "urgente"
                                ? "Toutes les taches urgentes"
                                : "Toutes les taches",
                style: TextStyle(
                    color: FIRST_THEME_COLOR,
                    fontSize: 25,
                    fontWeight: FontWeight.bold),
              ),
            ],
          ),
          const SizedBox(
            height: 15,
          ),
          Expanded(
              child: ListView.builder(
                  itemCount: listTask.length,
                  itemBuilder: (context, index) => Container(
                        margin:
                            const EdgeInsets.only(top: 12, left: 10, right: 10),
                        decoration: BoxDecoration(
                          color: Theme.of(context).cardColor,
                          border:
                              Border.all(color: Theme.of(context).primaryColor),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: InkWell(
                          onTap: () {
                            setState(() {
                              listTask[index].selected = true;
                            });
                            _showOperation(listTask[index], index);
                          },
                          child: ListTile(
                            leading: Container(
                              child: listTask[index].selected == true
                                  ?
                                  // Container(
                                  //   width: 30,
                                  //   height: 30,
                                  //   decoration: BoxDecoration(
                                  //     shape: BoxShape.circle,
                                  //     color: FIRST_THEME_COLOR
                                  //   ),
                                  //   child: Icon(
                                  //       Icons.check,
                                  //       color: Colors.white,
                                  //       size: 28,
                                  //     ),
                                  // )

                                  Icon(
                                      Icons.check_box,
                                      color: FIRST_THEME_COLOR,
                                      size: 45,
                                    )
                                  : listTask[index].etat != "TERMINE"
                                      ? Image.asset(
                                          "assets/images/Checklist.png",
                                          fit: BoxFit.cover,
                                          width: 50)
                                      : Icon(
                                          Icons.verified,
                                          color: FIRST_THEME_COLOR,
                                          size: 45,
                                        ),
                            ),
                            title: Text(
                              "${listTask[index].nom}",
                              style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: FIRST_THEME_COLOR),
                            ),
                            subtitle: Text(
                              "${listTask[index].dateDebut}, ${listTask[index].heureDebut}",
                              style: const TextStyle(
                                  fontStyle: FontStyle.italic,
                                  fontWeight: FontWeight.bold),
                            ),
                            trailing: PopupMenuButton(
                              enabled: listTask[index].etat != "TERMINE",
                              splashRadius: 10,
                              padding: const EdgeInsets.only(top: 0),
                              position: PopupMenuPosition.under,
                              child: listTask[index].urgente != 0
                                  ? Icon(
                                      Icons.warning,
                                      color: Colors.red,
                                      size: 30,
                                    )
                                  : listTask[index].importante != 0
                                      ? const Icon(
                                          Icons.star,
                                          color:
                                              Color.fromARGB(255, 245, 147, 10),
                                          size: 30,
                                        )
                                      : Icon(
                                          Icons.star_outline,
                                          color: FIRST_THEME_COLOR,
                                          size: 30,
                                        ),
                              itemBuilder: (BuildContext context) {
                                if (listTask[index].importante >= 0 &&
                                    listTask[index].urgente == 0) {
                                  return [
                                    PopupMenuItem(
                                      onTap: () {
                                        setState(() {
                                          setTaskImportante(
                                              listTask[index].id, 0);
                                        });
                                      },
                                      child: const ListTile(
                                          hoverColor: Colors.transparent,
                                          minLeadingWidth: 35,
                                          minVerticalPadding: 0,
                                          horizontalTitleGap: 10,
                                          title: Text(
                                            "Marquer comme non importante",
                                            style: TextStyle(
                                                fontWeight: FontWeight.w600),
                                          ),
                                          leading: Icon(
                                            Icons.star,
                                            color: Color.fromARGB(
                                                255, 218, 204, 203),
                                            size: 20,
                                          )),
                                    ),
                                    PopupMenuItem(
                                      onTap: () {
                                        setState(() {
                                          setTaskImportante(
                                              listTask[index].id, 2);
                                        });
                                      },
                                      child:  ListTile(
                                          hoverColor: Colors.transparent,
                                          focusColor: Colors.transparent,
                                          minLeadingWidth: 35,
                                          minVerticalPadding: 0,
                                          horizontalTitleGap: 10,
                                          title: Text(
                                            "Importance modérée",
                                            style: TextStyle(
                                                fontWeight: FontWeight.w600),
                                          ),
                                          leading: Icon(
                                            Icons.access_time,
                                            color: Colors.yellow,
                                          ), trailing:listTask[index].importante==2? Icon(Icons.check,color: Colors.green,):Text(""),),
                                    ),
                                    PopupMenuItem(
                                      onTap: () {
                                        setTaskImportante(
                                            listTask[index].id, 4);
                                        setState(() {});
                                      },
                                      child:  ListTile(
                                          hoverColor: Colors.transparent,
                                          minLeadingWidth: 35,
                                          minVerticalPadding: 0,
                                          horizontalTitleGap: 10,
                                          title: Text(
                                            "Tres importante",
                                            style: TextStyle(
                                                fontWeight: FontWeight.w600),
                                          ),
                                          leading: Icon(
                                            Icons.warning,
                                            color: Colors.orange,
                                            size: 20,
                                          ),
                                          trailing:listTask[index].importante==4? Icon(Icons.check,color: Colors.green,):Text(""),)
                                          ,
                                    ),
                                    PopupMenuItem(
                                      onTap: () {
                                        setTaskImportante(
                                            listTask[index].id, 6);
                                        setState(() {});
                                      },
                                      child:  ListTile(
                                          hoverColor: Colors.transparent,
                                          minLeadingWidth: 35,
                                          minVerticalPadding: 0,
                                          horizontalTitleGap: 10,
                                          title: Text(
                                            "Extremement importante",
                                            style: TextStyle(
                                                fontWeight: FontWeight.w600),
                                          ),
                                          leading: Icon(
                                            Icons.error,
                                            color: Colors.red,
                                            size: 20,
                                          ), trailing:listTask[index].importante==6? Icon(Icons.check,color: Colors.green,):Text(""),),
                                    ),
                                  ];
                                } else if (listTask[index].importante == 0 &&
                                    listTask[index].urgente >= 0) {
                                  return [
                                    PopupMenuItem(
                                      onTap: () {
                                        setState(() {
                                          setTaskImportante(
                                              listTask[index].id, 0);
                                        });
                                      },
                                      child: const ListTile(
                                          hoverColor: Colors.transparent,
                                          minLeadingWidth: 35,
                                          minVerticalPadding: 0,
                                          horizontalTitleGap: 10,
                                          title: Text(
                                            "Marquer comme non urgente",
                                            style: TextStyle(
                                                fontWeight: FontWeight.w600),
                                          ),
                                          leading: Icon(
                                            Icons.error,
                                            color: Color.fromARGB(
                                                255, 227, 221, 220),
                                            size: 20,
                                          )),
                                    ),
                                    PopupMenuItem(
                                      onTap: () {
                                        setTaskImportante(
                                            listTask[index].id, 1);
                                      },
                                      child:  ListTile(
                                          hoverColor: Colors.transparent,
                                          focusColor: Colors.transparent,
                                          minLeadingWidth: 35,
                                          minVerticalPadding: 0,
                                          horizontalTitleGap: 10,
                                          title: Text(
                                            "Urgence modérée",
                                            style: TextStyle(
                                                fontWeight: FontWeight.w600),
                                          ),
                                          leading: Icon(
                                            Icons.access_time,
                                            color: Colors.yellow,
                                          ), trailing:listTask[index].urgente==1? Icon(Icons.check,color: Colors.green,):Text(""),),
                                    ),
                                    PopupMenuItem(
                                      onTap: () {
                                        setTaskImportante(
                                            listTask[index].id, 3);
                                      },
                                      child:  ListTile(
                                          hoverColor: Colors.transparent,
                                          minLeadingWidth: 35,
                                          minVerticalPadding: 0,
                                          horizontalTitleGap: 10,
                                          title: Text(
                                            "Tres urgente",
                                            style: TextStyle(
                                                fontWeight: FontWeight.w600),
                                          ),
                                          leading: Icon(
                                            Icons.warning,
                                            color: Colors.orange,
                                            size: 20,
                                          ), trailing:listTask[index].urgente==3? Icon(Icons.check,color: Colors.green,):Text(""),),
                                    ),
                                    PopupMenuItem(
                                      onTap: () {
                                        print("tetstttt");
                                        setTaskImportante(
                                            listTask[index].id, 5);
                                      },
                                      child:  ListTile(
                                          hoverColor: Colors.transparent,
                                          minLeadingWidth: 35,
                                          minVerticalPadding: 0,
                                          horizontalTitleGap: 10,
                                          title: Text(
                                            "Extremement urgente",
                                            style: TextStyle(
                                                fontWeight: FontWeight.w600),
                                          ),
                                          leading: Icon(
                                            Icons.error,
                                            color: Colors.red,
                                            size: 20,
                                          ), trailing:listTask[index].urgente==5? Icon(Icons.check,color: Colors.green,):Text(""),),
                                    ),
                                    
                                  ];
                                }else{
                                  return [];
                                }
                              },
                            ),

                            // IconButton(
                            //     onPressed: () {
                            //       // if (listTask[index].etat != "TERMINE" &&
                            //       //     listTask[index].urgente &&
                            //       //     !listTask[index].importante) {
                            //       //   setState(() {
                            //       //     listTask[index].importante =
                            //       //         !listTask[index].importante;

                            //       //     print(
                            //       //         "importance : ${!listTask[index].importante}");
                            //       //     setTaskImportante(listTask[index].id.id,
                            //       //         true);
                            //       //   });
                            //       // }
                            //       //  else if (typeList != "finished" &&
                            //       //     !listTask[index].importante &&
                            //       //     !listTask[index].urgente) {
                            //       //   setState(() {
                            //       //     listTask[index].urgente =
                            //       //         !listTask[index].urgente;

                            //       //     print(
                            //       //         "urgence : ${!listTask[index].urgente}");
                            //       //     setTaskImportante(listTask[index].id.id,
                            //       //         !listTask[index].urgente);
                            //       //   });
                            //       // }
                            //     },
                            // icon: listTask[index].urgente!=0
                            //     ? Icon(
                            //         Icons.warning,
                            //         color: Colors.red,
                            //         size: 30,
                            //       )
                            //     : listTask[index].importante!=0
                            //         ? const Icon(
                            //             Icons.star,
                            //             color: Color.fromARGB(
                            //                 255, 245, 147, 10),
                            //             size: 30,
                            //           )
                            //         : Icon(
                            //             Icons.star_outline,
                            //             color: FIRST_THEME_COLOR,
                            //             size: 30,
                            //           )),
                          ),
                        ),
                      )))
        ],
      )),
    );
  }

  _showSort() {
    return showModalBottomSheet(
      context: context,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(15),
        ),
      ),
      builder: (context) {
        return Wrap(
          spacing: 5,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            Container(
              decoration: BoxDecoration(
                color: selectedTheme == "Thème clair"
                    ? FIRST_THEME_COLOR
                    : Color.fromARGB(255, 36, 36, 36),
                borderRadius: BorderRadius.vertical(
                  top: Radius.circular(15),
                ),
              ),
              child: Column(
                children: [
                  SizedBox(height: 5),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        width: 100,
                        height: 5,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(50),
                        ),
                      )
                    ],
                  ),
                  SizedBox(height: 10),
                  Row(
                    children: const [
                      SizedBox(width: 30),
                      Text(
                        "Trier par",
                        style: TextStyle(color: Colors.white),
                      ),
                    ],
                  ),
                  SizedBox(height: 10),
                  Visibility(
                    visible: initial != "important" && initial != "urgente",
                    child: InkWell(
                      onTap: () {
                        setState(() {
                          typeList = "important";
                          if (initial == "finished") {
                            typeList = "TermineeImportantes";
                          }
                          getTaskList(typeList!);
                        });
                      },
                      child: Container(
                        margin: EdgeInsets.only(
                            left: MediaQuery.of(context).size.width * 0.3),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: const [
                            Icon(Icons.star_outline_outlined,
                                color: Colors.white),
                            SizedBox(width: 10),
                            Text(
                              "Importance",
                              style: TextStyle(color: Colors.white),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Visibility(
                      visible: initial != "important" && initial != "urgente",
                      child: SizedBox(height: 10)),
                  Visibility(
                    visible: initial != "important" && initial != "urgente",
                    child: InkWell(
                      onTap: () {
                        setState(() {
                          typeList = "urgente";
                          if (initial == "finished") {
                            typeList = "TermineeUrgentes";
                          }
                          getTaskList(typeList!);
                        });
                      },
                      child: Container(
                        margin: EdgeInsets.only(
                            left: MediaQuery.of(context).size.width * 0.3),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: const [
                            Icon(Icons.warning_outlined, color: Colors.white),
                            SizedBox(width: 10),
                            Text(
                              "Urgence",
                              style: TextStyle(color: Colors.white),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Visibility(
                      visible: initial != "important" && initial != "urgente",
                      child: SizedBox(height: 10)),
                  InkWell(
                    onTap: () {
                      setState(() {
                        typeList = "dateEcheance";
                        if (initial == "urgente") {
                          typeList = "urgenteDateEcheance";
                        } else if (initial == "important") {
                          typeList = "importantDateEcheance";
                        }
                        getTaskList(typeList!);
                      });
                    },
                    child: Container(
                      margin: EdgeInsets.only(
                          left: MediaQuery.of(context).size.width * 0.3),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: const [
                          Icon(Icons.date_range_sharp, color: Colors.white),
                          SizedBox(width: 10),
                          Text(
                            "Date d'échéance",
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 10),
                  InkWell(
                    onTap: () {
                      setState(() {
                        typeList = "alphabetique";
                        if (initial == "urgente") {
                          typeList = "urgenteAlphabetique";
                        } else if (initial == "important") {
                          typeList = "importantAlphabetique";
                        }
                        print(typeList);
                        getTaskList(typeList!);
                      });
                    },
                    child: Container(
                      margin: EdgeInsets.only(
                          left: MediaQuery.of(context).size.width * 0.3),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: const [
                          Icon(Icons.sort_by_alpha, color: Colors.white),
                          SizedBox(width: 10),
                          Text(
                            "Ordre alphabétique",
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 10),
                  InkWell(
                    onTap: () {
                      setState(() {
                        typeList = "dateCreation";
                        if (initial == "urgente") {
                          typeList = "urgenteDateCreation";
                        } else if (initial == "important") {
                          typeList = "importantDateCreation";
                        }
                        getTaskList(typeList!);
                      });
                    },
                    child: Container(
                      margin: EdgeInsets.only(
                          left: MediaQuery.of(context).size.width * 0.3),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: const [
                          Icon(Icons.date_range_sharp, color: Colors.white),
                          SizedBox(width: 10),
                          Text(
                            "Date de création",
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 10),
                  InkWell(
                    onTap: () {
                      setState(() {
                        typeList = "heure";
                        if (initial == "urgente") {
                          typeList = "urgenteHeure";
                        } else if (initial == "important") {
                          typeList = "importantHeure";
                        }
                        getTaskList(typeList!);
                      });
                    },
                    child: Container(
                      margin: EdgeInsets.only(
                          left: MediaQuery.of(context).size.width * 0.3),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: const [
                          Icon(Icons.alarm, color: Colors.white),
                          SizedBox(width: 10),
                          Text(
                            "Heure",
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 10),
                  InkWell(
                    onTap: () {
                      setState(() {
                        getTaskList(initial!);
                      });
                    },
                    child: Container(
                      margin: EdgeInsets.only(
                          left: MediaQuery.of(context).size.width * 0.3),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: const [
                          Icon(Icons.update, color: Colors.white),
                          SizedBox(width: 10),
                          Text(
                            "Reinitialiser les filtres",
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 30),
                ],
              ),
            ),
          ],
        );
      },
    ).whenComplete(() {
      setState(() {
        okTri = false;
      });
    });
  }

  _showOperation(Tache tache, index) {
    setState(() {
      listTask[index].selected = true;
      tache.selected = true;
    });

    return showModalBottomSheet(
      context: context,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(15),
        ),
      ),
      builder: (context) {
        return Wrap(
          spacing: 5,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            Container(
              decoration: BoxDecoration(
                color: selectedTheme == "Thème clair"
                    ? FIRST_THEME_COLOR
                    : Color.fromARGB(255, 36, 36, 36),
                borderRadius: BorderRadius.vertical(
                  top: Radius.circular(15),
                ),
              ),
              child: Column(
                children: [
                  SizedBox(height: 5),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        width: 100,
                        height: 5,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(50),
                        ),
                      )
                    ],
                  ),
                  SizedBox(height: 10),
                  Row(
                    children: const [
                      SizedBox(width: 30),
                      Text(
                        "",
                        style: TextStyle(color: Colors.white),
                      ),
                    ],
                  ),
                  // SizedBox(height: 10),
                  // InkWell(
                  //   onTap: () {},
                  //   child: Container(
                  //     margin: EdgeInsets.only(
                  //         left: MediaQuery.of(context).size.width * 0.3),
                  //     child: Row(
                  //       mainAxisAlignment: MainAxisAlignment.start,
                  //       children: const [
                  //         Icon(Icons.star_outline_outlined,
                  //             color: Colors.white),
                  //         SizedBox(width: 10),
                  //         Text(
                  //           "Marquer la tache comme importante",
                  //           style: TextStyle(color: Colors.white),
                  //         ),
                  //       ],
                  //     ),
                  //   ),
                  // ),
                  Visibility(
                      visible: tache.etat != "TERMINE",
                      child: SizedBox(height: 10)),
                  Visibility(
                    visible: tache.etat != "TERMINE",
                    child: InkWell(
                      onTap: () {},
                      // child: Container(
                      //   margin: EdgeInsets.only(
                      //       left: MediaQuery.of(context).size.width * 0.3),
                      //   child: Row(
                      //     mainAxisAlignment: MainAxisAlignment.start,
                      //     children: const [
                      //       Icon(Icons.warning, color: Colors.white),
                      //       SizedBox(width: 10),
                      //       Text(
                      //         "Marquer la tache comme urgente",
                      //         style: TextStyle(color: Colors.white),
                      //       ),
                      //     ],
                      //   ),
                      // ),
                      child: Container(
                        margin: EdgeInsets.only(
                            left: MediaQuery.of(context).size.width * 0.3),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Icon(Icons.warning_amber_outlined,
                                color: Colors.white),
                            SizedBox(width: 10),
                            PopupMenuButton(
                              tooltip: 'Menu',
                              splashRadius: 10,
                              padding: const EdgeInsets.only(top: 0),
                              position: PopupMenuPosition.under,
                              child: Text(
                                "Marquer la tache comme urgente",
                                style: TextStyle(color: Colors.white),
                              ),
                              itemBuilder: (BuildContext context) {
                                return [
                                  PopupMenuItem(
                                      onTap: () {
                                        setTaskImportante(
                                            listTask[index].id, 1);
                                      },
                                      child:  ListTile(
                                          hoverColor: Colors.transparent,
                                          focusColor: Colors.transparent,
                                          minLeadingWidth: 35,
                                          minVerticalPadding: 0,
                                          horizontalTitleGap: 10,
                                          title: Text(
                                            "Urgence modérée",
                                            style: TextStyle(
                                                fontWeight: FontWeight.w600),
                                          ),
                                          leading: Icon(
                                            Icons.access_time,
                                            color: Colors.yellow,
                                          ), trailing:listTask[index].urgente==1? Icon(Icons.check,color: Colors.green,):Text(""),),
                                    ),
                                    PopupMenuItem(
                                      onTap: () {
                                        setTaskImportante(
                                            listTask[index].id, 3);
                                      },
                                      child:  ListTile(
                                          hoverColor: Colors.transparent,
                                          minLeadingWidth: 35,
                                          minVerticalPadding: 0,
                                          horizontalTitleGap: 10,
                                          title: Text(
                                            "Tres urgente",
                                            style: TextStyle(
                                                fontWeight: FontWeight.w600),
                                          ),
                                          leading: Icon(
                                            Icons.warning,
                                            color: Colors.orange,
                                            size: 20,
                                          ), trailing:listTask[index].urgente==3? Icon(Icons.check,color: Colors.green,):Text(""),),
                                    ),
                                    PopupMenuItem(
                                      onTap: () {
                                        print("tetstttt");
                                        setTaskImportante(
                                            listTask[index].id, 5);
                                      },
                                      child:  ListTile(
                                          hoverColor: Colors.transparent,
                                          minLeadingWidth: 35,
                                          minVerticalPadding: 0,
                                          horizontalTitleGap: 10,
                                          title: Text(
                                            "Extremement urgente",
                                            style: TextStyle(
                                                fontWeight: FontWeight.w600),
                                          ),
                                          leading: Icon(
                                            Icons.error,
                                            color: Colors.red,
                                            size: 20,
                                          ), trailing:listTask[index].urgente==5? Icon(Icons.check,color: Colors.green,):Text(""),),
                                    ),
                                  PopupMenuItem(
                                    onTap: () {
                                      setState(() {
                                        setTaskImportante(
                                            listTask[index].id, 0);
                                      });
                                    },
                                    child: const ListTile(
                                        hoverColor: Colors.transparent,
                                        minLeadingWidth: 35,
                                        minVerticalPadding: 0,
                                        horizontalTitleGap: 10,
                                        title: Text(
                                          "Marquer comme non urgente",
                                          style: TextStyle(
                                              fontWeight: FontWeight.w600),
                                        ),
                                        leading: Icon(
                                          Icons.error,
                                          color: Color.fromARGB(
                                              255, 227, 221, 220),
                                          size: 20,
                                        )),
                                  ),
                                ];
                              },
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 10),
                  Visibility(
                    visible: tache.etat != "TERMINE",
                    child: InkWell(
                      onTap: () {
                        setTaskTermine(tache.id);
                        Navigator.pop(context);
                      },
                      child: Container(
                        margin: EdgeInsets.only(
                            left: MediaQuery.of(context).size.width * 0.3),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: const [
                            Icon(Icons.task_alt, color: Colors.white),
                            SizedBox(width: 10),
                            Text(
                              "Marquer la tache comme terminée",
                              style: TextStyle(color: Colors.white),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 10),
                  InkWell(
                    onTap: () {
                      setState(() {
                        if (tache.etat != "TERMINE") {
                          isVisibleSaveTask = false;
                          isVisibleUpdateTask = true;
                        } else {
                          isVisibleSaveTask = false;
                          isVisibleUpdateTask = false;
                        }
                      });
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: ((context) => AddTask(
                                    tache: tache,
                                  )))).then((value) {
                        setState(() {
                          getTaskList(typeList!);
                        });
                      });
                    },
                    child: Container(
                      margin: EdgeInsets.only(
                          left: MediaQuery.of(context).size.width * 0.3),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: const [
                          Icon(Icons.sort_by_alpha, color: Colors.white),
                          SizedBox(width: 10),
                          Text(
                            "Afficher la tache",
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 10),
                  InkWell(
                    onTap: () {
                      showDeletionDialog(tache);
                    },
                    child: Container(
                      margin: EdgeInsets.only(
                          left: MediaQuery.of(context).size.width * 0.3),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: const [
                          Icon(Icons.delete_outline_outlined,
                              color: Colors.white),
                          SizedBox(width: 10),
                          Text(
                            "Supprimer la tache",
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 30),
                ],
              ),
            ),
          ],
        );
      },
    ).whenComplete(() {
      setState(() {
        listTask[index].selected = false;
      });
    });
  }

  void showDeletionDialog(Tache tache) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          content: Container(
            height: 1,
            margin: EdgeInsets.only(top: 40, left: 10, right: 10),
            decoration: BoxDecoration(color: Color.fromARGB(255, 37, 37, 37)),
          ),
          title: Center(
              child: const Text(
            'Voulez-vous vraiment supprimer cette tache?',
            style: TextStyle(color: Colors.red),
          )),
          actions: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                TextButton(
                  onPressed: () {
                    deleteTask(tache.id);
                    Navigator.of(context).pop();
                    Navigator.of(context).pop();
                  },
                  child: Text(
                    'Oui',
                    style: TextStyle(color: FIRST_THEME_COLOR, fontSize: 20),
                  ),
                ),
                TextButton(
                  onPressed: () {
                    // Logique de suppression
                    Navigator.of(context).pop();
                  },
                  child: Text(
                    'Non',
                    style: TextStyle(color: SECOND_THEME_COLOR, fontSize: 20),
                  ),
                ),
              ],
            )
          ],
        );
      },
    );
  }
}
