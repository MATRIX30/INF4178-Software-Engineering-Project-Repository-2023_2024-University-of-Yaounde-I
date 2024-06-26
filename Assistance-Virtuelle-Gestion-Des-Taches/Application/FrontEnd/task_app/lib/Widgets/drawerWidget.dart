import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'package:task_app/Models/User.dart';
import 'package:task_app/Screen/AppAndBottomBar.dart';
import 'package:task_app/Screen/TaskList.dart';
import 'package:task_app/Screen/login.dart';
import 'package:task_app/Screen/profile.dart';
import 'package:task_app/Screen/virtualAssistance.dart';
import 'package:task_app/Utils/Global.dart';
import 'package:task_app/Utils/Themes.dart';

class AppDrawer extends StatefulWidget {
  const AppDrawer({super.key});

  @override
  State<AppDrawer> createState() => _AppDrawerState();
}

class _AppDrawerState extends State<AppDrawer> {
  String _selectedItem = '';

 

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: const BorderRadius.only(
        topRight: Radius.circular(20.0),
        bottomRight: Radius.circular(20.0),
      ),
      child: Drawer(
        backgroundColor:selectedTheme == "Thème clair"?FIRST_THEME_COLOR:  Color.fromARGB(255, 36, 36, 36),
        width: MediaQuery.of(context).size.width * 0.8,
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              child: Align(
                alignment: Alignment.centerLeft,
                child: InkWell(
                  onTap: () {
                    // Navigator.push(
                    //     context,
                    //     MaterialPageRoute(
                    //         builder: (context) => const AccountSetting()));
                  },
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Row(
                        children: [
                          Container(
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
                          const SizedBox(
                            width: 15,
                          ),
                          Text(
                            "${User.instance!.firstName[0].toUpperCase() + User.instance!.firstName.substring(1).toLowerCase()} ${User.instance!.lastName[0].toUpperCase() + User.instance!.lastName.substring(1).toLowerCase()}",
                            style: GoogleFonts.poppins(
                              color: Colors.white,
                              fontSize: 20,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 20),
              child: Column(
                children: [
                  Visibility(
                    visible: true,
                    child: DrawerMenuListTile(
                      widget: const Icon(
                        Icons.person_sharp,
                        color: Colors.white,
                        size: 30,
                      ),
                      title: "My profile",
                      isSelected: _selectedItem == "My profile",
                      onTap: () {
                        setState(() {
                          _selectedItem = "My profile";
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const ProfilePage()),
                          );
                        });
                      },
                    ),
                  ),
                  DrawerMenuListTile(
                    widget: Container(
                      child: Image.asset("assets/images/logo.png",
                          fit: BoxFit.cover, width: 30),
                    ),
                    title: "Virtual assistance",
                    isSelected: _selectedItem == "Virtual assistance",
                    onTap: () {
                      setState(() {
                        _selectedItem = "Virtual assistance";
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => VirtualAssistance()),
                        );
                      });
                    },
                  ),
                  DrawerMenuListTile(
                    widget: const Icon(
                      Icons.add_box_sharp,
                      color: Colors.white,
                      size: 30,
                    ),
                    title: "Add new task",
                    isSelected: _selectedItem == "Add new task",
                    onTap: () {
                      print("okk");
                      setState(() {
                        _selectedItem = "Add new task";

                        isVisibleSaveTask = true;
                        isVisibleUpdateTask = false;

                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => AppAndBottomBar(
                                      selectedIndex: 1,
                                    )));
                      });
                    },
                  ),
                  DrawerMenuListTile(
                    widget: const Icon(
                      Icons.star,
                      color: Colors.white,
                      size: 30,
                    ),
                    title: "Priority task list",
                    isSelected: _selectedItem == "Priority task list",
                    onTap: () {
                      setState(() {
                        _selectedItem = "Priority task list";
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => TaskListScreen(
                                    typeList: "important",
                                  )),
                        );
                      });
                    },
                  ),
                  DrawerMenuListTile(
                    widget: const Icon(
                      Icons.warning,
                      color: Colors.white,
                      size: 30,
                    ),
                    title: "Urgence task list",
                    isSelected: _selectedItem == "Urgence task list",
                    onTap: () {
                      setState(() {
                        _selectedItem = "Urgence task list";
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => TaskListScreen(
                                    typeList: "urgente",
                                  )),
                        );
                      });
                    },
                  ),
                  DrawerMenuListTile(
                    widget: const Icon(
                      Icons.task,
                      color: Colors.white,
                      size: 30,
                    ),
                    title: "Finished Task List",
                    isSelected: _selectedItem == "Finished Task List",
                    onTap: () {
                      setState(() {
                        _selectedItem = "Finished Task List";
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => TaskListScreen(
                                    typeList: "finished",
                                  )),
                        );
                      });
                    },
                  ),
                  DrawerMenuListTile(
                    widget: const Icon(
                      Icons.view_list,
                      color: Colors.white,
                      size: 30,
                    ),
                    title: "All task list",
                    isSelected: _selectedItem == "All task list",
                    onTap: () {
                      setState(() {
                        _selectedItem = "All task list";
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => TaskListScreen(
                                    typeList: "all",
                                  )),
                        );
                      });
                    },
                  ),
                  DrawerMenuListTile(
                    widget: const Icon(
                      Icons.logout_outlined,
                      color: Colors.white,
                      size: 30,
                    ),
                    title: "déconnexion",
                    isSelected: false,
                    onTap: () {
                      setState(() {
                        _selectedItem = "déconnexion";
                      });
                      quitter();
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  quitter() {
    showDialog(
      barrierDismissible: false,
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(5),
          ),
          title: Row(
            children: [
              const Icon(
                Icons.warning,
                color: Colors.red,
              ),
              const SizedBox(
                width: 10,
              ),
              Text(
                "Alerte".toUpperCase(),
                style: const TextStyle(fontSize: 13),
              )
            ],
          ),
          content: const Text(
            "Voulez vous vraiment vous deconnecter?",
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const LoginPage()),
                );
              },
              child: const Text("Oui"),
            ),
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text("Non"),
            ),
          ],
        );
      },
    );
  }
}

class DrawerMenuListTile extends StatelessWidget {
  const DrawerMenuListTile({
    super.key,
    required this.widget,
    required this.title,
    required this.onTap,
    required this.isSelected,
  });

  final Widget widget;
  final String title;
  final Function onTap;
  final bool isSelected;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(left: 10, right: 20),
      decoration: BoxDecoration(
        border: isSelected
            ? const Border(
                bottom: BorderSide(
                  color: Colors.white,
                  width: 2.0,
                ),
              )
            : null,
      ),
      child: ListTile(
        leading: widget,
        title: Text(
          title,
          style: GoogleFonts.roboto(
            fontSize: 14,
            fontWeight: FontWeight.w500,
            color: Colors.white,
          ),
        ),
        onTap: () {
          onTap();
        },
      ),
    );
  }
}
