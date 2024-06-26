import 'package:flutter/material.dart';
import 'package:task_app/Models/Notification.dart';
import 'package:task_app/Models/User.dart';
import 'package:task_app/Services/OtherServices.dart';
import 'package:task_app/Utils/Themes.dart';

class EndDrawer extends StatefulWidget {
  const EndDrawer({super.key});

  @override
  State<EndDrawer> createState() => _EndDrawerState();
}

class _EndDrawerState extends State<EndDrawer> {
  List<Notifications> notificationsList = <Notifications>[];

  getNotification() {
    OtherServices.getAllNotifications(User.instance!.id).then((value) {
      setState(() {
        notificationsList = value;
      });
    });
  }

  markNotificationLu(Notifications notificaton) {
    OtherServices.markNotification(notificaton.id).then((value) {
      if (value == "success") {
        print("opeartion reussie");
        getNotification();
      } else {
        print("echec de l'operation");
      }
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getNotification();
  }

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      // borderRadius: const BorderRadius.only(
      //   topLeft: Radius.circular(20.0),
      //   bottomLeft: Radius.circular(20.0),
      // ),
      child: Drawer(
        backgroundColor: Theme.of(context).backgroundColor,
        width: MediaQuery.of(context).size.width,
        child: Column(
          children: [
            const SizedBox(
              height: 50,
            ),
            Row(
              children: [
                const SizedBox(
                  width: 10,
                ),
                Builder(builder: ((context) {
                  return IconButton(
                      onPressed: () {
                        Scaffold.of(context).closeEndDrawer();
                      },
                      icon: const Icon(Icons.arrow_back_ios));
                })),
                const SizedBox(
                  width: 30,
                ),
                const Text(
                  "Notifications",
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            Expanded(
                child: ListView.builder(
                    itemCount: notificationsList.length,
                    itemBuilder: (context, index) => Container(
                          margin: const EdgeInsets.only(top: 5),
                          decoration: BoxDecoration(
                              color: notificationsList[index].dejalu
                                  ? Theme.of(context).backgroundColor
                                  : Theme.of(context).cardColor),
                          child: InkWell(
                            onTap: () {
                              //       Navigator.push(
                              //           context,
                              //           MaterialPageRoute(
                              //               builder: (context) => InfosFosa(
                              //                     fosa: fosaList[index],
                              //                   ))).then((value) {
                              //   getFormationSanitaires();
                              // });
                            },
                            child: ListTile(
                              onTap: () {
                                showViewDialog(notificationsList[index]);
                                markNotificationLu(notificationsList[index]);
                              },
                              leading: Container(
                                  child: Image.asset(
                                'assets/images/clock.png',
                                width: 20,
                              )),
                              title: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    notificationsList[index].titre,
                                    style: const TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold),
                                  ),
                                  Text(
                                    notificationsList[index]
                                        .date
                                        .substring(11, 16),
                                    style: const TextStyle(
                                        color:  Color.fromARGB(255, 92, 90, 90),
                                        fontSize: 14,
                                        fontWeight: FontWeight.normal),
                                  ),
                                ],
                              ),
                              subtitle: Column(
                                children: [
                                  const SizedBox(
                                    height: 5,
                                  ),
                                  Text(
                                    notificationsList[index].message,
                                    style: const TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w400),
                                  ),
                                  const SizedBox(
                                    height: 15,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        )))
          ],
        ),
      ),
    );
  }

  void showViewDialog(Notifications notification) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return Container(
          margin: const EdgeInsets.only(left: 30),
          child: AlertDialog(
            title: Container(
              height: 40,
              child: Center(
                child: Text(
                  notification.titre,
                  style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ),
            ),
            content: SizedBox(
              height: 100,
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    const SizedBox(
                      height: 10,
                    ),
                    Center(
                        child: Text(
                      notification.message,
                     
                    )),
                  ],
                ),
              ),
            ),
            actions: [
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: () {
                      // Logique de suppression
                      Navigator.of(context).pop();
                    },
                    child: Text(
                      "D'accord",
                      style: TextStyle(color: FIRST_THEME_COLOR, fontSize: 15),
                    ),
                  ),
                ],
              )
            ],
          ),
        );
      },
    );
  }
}
