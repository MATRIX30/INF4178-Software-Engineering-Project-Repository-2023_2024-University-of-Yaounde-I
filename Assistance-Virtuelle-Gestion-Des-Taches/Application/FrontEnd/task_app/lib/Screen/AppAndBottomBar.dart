import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:task_app/Models/Notification.dart';
import 'package:task_app/Models/User.dart';
import 'package:task_app/Screen/AddTask.dart';
import 'package:task_app/Screen/HomePage.dart';
import 'package:task_app/Screen/login.dart';
import 'package:task_app/Screen/parameters.dart';
import 'package:task_app/Services/OtherServices.dart';
import 'package:task_app/Utils/Global.dart';
import 'package:task_app/Utils/Themes.dart';
import 'package:task_app/Widgets/drawerWidget.dart';
import 'package:water_drop_nav_bar/water_drop_nav_bar.dart';

// ignore: must_be_immutable
class AppAndBottomBar extends StatefulWidget {
  int selectedIndex;
   AppAndBottomBar({Key? key,required this.selectedIndex});

  @override
  _AppAndBottomBarState createState() => _AppAndBottomBarState(selectedIndex:selectedIndex);
}

class _AppAndBottomBarState extends State<AppAndBottomBar> {

  int selectedIndex = 0;
  _AppAndBottomBarState({required this.selectedIndex});

  final Color navigationBarColor = Colors.white;

   
  
  late PageController pageController;
  @override
  void initState() {
    super.initState();
    
    
    pageController = PageController(initialPage: selectedIndex);
  }

  @override
  Widget build(BuildContext context) {
    /// [AnnotatedRegion<SystemUiOverlayStyle>] only for android black navigation bar. 3 button navigation control (legacy)

    return WillPopScope(
      onWillPop: () => quitter(),
      child: AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          systemNavigationBarColor: Theme.of(context).scaffoldBackgroundColor,
          systemNavigationBarIconBrightness: Brightness.dark,
        ),
        child: Scaffold(
          
    
          body: PageView(
            physics: const NeverScrollableScrollPhysics(),
            controller: pageController,
            children: <Widget>[HomePage(), AddTask(), ParametersPage()],
          ),
          bottomNavigationBar: WaterDropNavBar(
            iconSize: 35,
            waterDropColor: FIRST_THEME_COLOR,
            backgroundColor: Theme.of(context).scaffoldBackgroundColor,
            onItemSelected: (int index) {
              setState(() {
                selectedIndex = index;
              });
              if(selectedIndex==1){
                setState(() {
                  isVisibleSaveTask=true;
                  isVisibleUpdateTask=false;
                });
              }
              pageController.animateToPage(selectedIndex,
                  duration: const Duration(milliseconds: 400),
                  curve: Curves.easeOutQuad);
            },
            selectedIndex: selectedIndex,
            barItems: <BarItem>[
              BarItem(
                filledIcon: Icons.home,
                outlinedIcon: Icons.home_outlined,
              ),
              BarItem(
                  filledIcon: Icons.add_box_sharp,
                  outlinedIcon: Icons.add_box_outlined),
              BarItem(
                filledIcon: Icons.settings,
                outlinedIcon: Icons.settings_outlined,
              ),
            ],
          ),
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
