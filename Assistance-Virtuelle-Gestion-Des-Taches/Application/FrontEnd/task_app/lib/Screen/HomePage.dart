import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:task_app/Models/Notification.dart';
import 'package:task_app/Models/Tache.dart';
import 'package:task_app/Models/User.dart';
import 'package:task_app/Screen/TaskList.dart';
import 'package:task_app/Screen/myAssistantBot.dart';
import 'package:task_app/Services/OtherServices.dart';
import 'package:task_app/Services/TacheService.dart';
import 'package:task_app/Utils/Global.dart';
import 'package:task_app/Utils/Themes.dart';
import 'package:task_app/Widgets/EndDrawer.dart';
import 'package:task_app/Widgets/drawerWidget.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<Tache> importantList = <Tache>[];
  List<Tache> todayList = <Tache>[];
  getImportant() {
    TacheService.getAllTachesImportantes(User.instance!.id).then((value) {
      setState(() {
        importantList = value;
      });
    });
  }

  getAllTaskToday() {
    TacheService.getAllTaches(User.instance!.id).then((value) {
      setState(() {
        todayList = value;
        todayList.removeWhere((element) =>
            element.dateDebut !=
            DateFormat('dd/MM/yyyy').format(DateTime.now()).toString());
      });
    });
  }

  List<Notifications> notificationsList = <Notifications>[];

  getNotification() {
    OtherServices.getAllNotifications(User.instance!.id).then((value) {
      setState(() {
        notificationsList = value;
        notificationsList.removeWhere((element) => element.dejalu == true);
      });
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getAllTaskToday();
    getImportant();
    getNotification();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        backgroundColor: FIRST_THEME_COLOR,
        onPressed: () {
        Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => MyAssistantBot(
                               
                              )),
                    );
         
        },
        child:  const Image(image: AssetImage("assets/images/stars.png")),
      ),
      backgroundColor: Theme.of(context).indicatorColor,
      drawer: const AppDrawer(),
      endDrawer: const EndDrawer(),
      appBar: AppBar(
        backgroundColor: Theme.of(context).indicatorColor,
        elevation: 0,
        leading: Builder(
          builder: (context) {
            return InkWell(
                onTap: () {
                  print("drawer");
                  Scaffold.of(context).openDrawer();
                },
                child: Image(
                      image: selectedTheme == "Thème clair"? const AssetImage("assets/images/menu.png"):const AssetImage("assets/images/menu.png"),
                    ),);
          },
        ),
        actions: [
          Stack(
            children: [
              Builder(builder: (context) {
                return IconButton(
                    onPressed: () {
                      print("endrawer");
                      Scaffold.of(context).openEndDrawer();
                    },
                    icon:  Icon(
                      Icons.notifications_outlined,
                      size: 35,
                      color:Theme.of(context).toggleableActiveColor,
                    ));
              }),
              Visibility(
                  visible: notificationsList.isNotEmpty,
                  child: Column(
                    children: [
                      const SizedBox(
                        height: 15,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const SizedBox(width: 25),
                          Container(
                            width: 10,
                            height: 10,
                            decoration: BoxDecoration(
                                color: FIRST_THEME_COLOR,
                                shape: BoxShape.circle),
                          )
                        ],
                      )
                    ],
                  ))
            ],
          )
        ],
      ),
      body: Column(
        children: [
          const SizedBox(
            height: 30,
          ),
          Container(
            height: 100,
            margin: const EdgeInsets.only(left: 30, right: 30),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Center(
              child: ListTile(
                leading: Container(
                  height: 100,
                  width: 50,
                  decoration: BoxDecoration(
                    image: const DecorationImage(
                      image: AssetImage('assets/images/profill.png'),
                      fit: BoxFit.cover,
                    ),
                    shape: BoxShape.circle,
                    border: Border.all(color: FIRST_THEME_COLOR),
                  ),
                ),
                title: Text(
                  "Welcome Back!!",
                  style: TextStyle(color: FIRST_THEME_COLOR, fontSize: 25),
                ),
                subtitle: Text(
                  "${User.instance!.firstName[0].toUpperCase() + User.instance!.firstName.substring(1).toLowerCase()} ${User.instance!.lastName[0].toUpperCase() + User.instance!.lastName.substring(1).toLowerCase()}",
                  style: const TextStyle(color: Colors.black, fontSize: 20),
                ),
              ),
            ),
          ),
          const SizedBox(
            height: 50,
          ),
          Container(
            margin: const EdgeInsets.only(left: 30, right: 30),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                 Text(
                  "Today's Task",
                  style:Theme.of(context)
                          .textTheme
                          .bodyText1
                          ?.copyWith(
                    fontSize: 25,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => TaskListScreen(
                                typeList: "all",
                              )),
                    );
                  },
                  child: Text(
                    "See all",
                    style: TextStyle(
                      color: FIRST_THEME_COLOR,
                      fontSize: 18,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(
            height: 10,
          ),
          Expanded(
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: todayList.length > 5 ? 5 : todayList.length,
              itemBuilder: (context, index) {
                Tache tache = todayList[index];
                return Container(
                  width: 160,
                  height: 300,
                  margin: const EdgeInsets.symmetric(horizontal: 5),
                  child: Card(
                    color: avatarColors[index % avatarColors.length],
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(5.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            child: Image.asset("assets/images/Checklist.png",
                                fit: BoxFit.cover, width: 50),
                          ),
                          const SizedBox(height: 10),
                          Text(
                            tache.nom,
                            //softWrap: true,
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            ),
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                          Text(
                            tache.dateDebut,
                            style: const TextStyle(
                                color: Colors.white,
                                fontStyle: FontStyle.italic,
                                fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          Text(
                            tache.heureDebut,
                            style: const TextStyle(
                                color: Colors.white,
                                fontStyle: FontStyle.italic,
                                fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          const SizedBox(
            height: 30,
          ),
          Container(
            margin: const EdgeInsets.only(left: 30, right: 30),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                 Text(
                  "Priority Task",
                  style: Theme.of(context)
                          .textTheme
                          .bodyText1
                          ?.copyWith(
                    fontSize: 25,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => TaskListScreen(
                                typeList: "important",
                              )),
                    );
                  },
                  child: Text(
                    "See all",
                    style: TextStyle(
                      color: FIRST_THEME_COLOR,
                      fontSize: 18,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(
            height: 0,
          ),
          Expanded(
              child: ListView.builder(
                  itemCount:
                      importantList.length > 3 ? 3 : importantList.length,
                  itemBuilder: (context, index) => Container(
                        margin:
                            const EdgeInsets.only(top: 12, left: 10, right: 10),
                        decoration: BoxDecoration(
                          color: Theme.of(context).cardColor,
                          border: Border.all(color: Theme.of(context).primaryColor),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: InkWell(
                          onTap: () {
                            // Navigator.push(
                            //     context,
                            //     MaterialPageRoute(
                            //         builder: (context) => inf()));
                          },
                          child: ListTile(
                            leading: Container(
                              child: Image.asset("assets/images/Checklist.png",
                                  fit: BoxFit.cover, width: 50),
                            ),
                            title: Text(
                              importantList[index].nom,
                              style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Theme.of(context).secondaryHeaderColor,),
                            ),
                            subtitle: Text(
                              "${importantList[index].dateDebut}, ${importantList[index].heureDebut}",
                              style: const TextStyle(
                                color: Color.fromARGB(255, 118, 118, 118),
                                  fontStyle: FontStyle.italic,
                                  fontWeight: FontWeight.bold),
                            ),
                            trailing: const Icon(
                              Icons.star,
                              color: Color.fromARGB(255, 245, 147, 10),
                              size: 30,
                            ),
                          ),
                        ),
                      )))
        ],
      ),
    );
  }
}
