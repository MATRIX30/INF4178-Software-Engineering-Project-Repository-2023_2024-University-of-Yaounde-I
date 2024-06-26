import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:task_app/Screen/aboutus.dart';
import 'package:task_app/Utils/Global.dart';
import 'package:task_app/Utils/themes.dart';
import 'package:task_app/Utils/themeProvider.dart';
import 'preferences.dart';

class ParametersPage extends StatefulWidget {
  @override
  _ParametersPageState createState() => _ParametersPageState();
}

class _ParametersPageState extends State<ParametersPage> {
  String? _selectedSound;
  

  @override
  void initState() {
    super.initState();
    
  
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            SizedBox(height: 100),
            Center(
              child: Icon(Icons.settings, color: Theme.of(context).iconTheme.color, size: 120),
            ),
            SizedBox(height: 16),
            Divider(color: Theme.of(context).dividerColor),
            ExpansionTile(
              backgroundColor: Theme.of(context).backgroundColor,
              collapsedBackgroundColor: Theme.of(context).backgroundColor,
              leading: Icon(Icons.notifications, color: Theme.of(context).iconTheme.color),
              title: Text(
                'Définir une sonnerie de rappel',
                style: TextStyle(color: Theme.of(context).textTheme.bodyText1?.color),
              ),
              children: <Widget>[
                RadioListTile<String?>(
                  title: Text('SON 1', style: TextStyle(color: Theme.of(context).textTheme.bodyText1?.color)),
                  value: 'SON 1',
                  groupValue: _selectedSound,
                  onChanged: (String? value) {
                    setState(() {
                      _selectedSound = value;
                    });
                  },
                ),
                RadioListTile<String?>(
                  title: Text('SON 2', style: TextStyle(color: Theme.of(context).textTheme.bodyText1?.color)),
                  value: 'SON 2',
                  groupValue: _selectedSound,
                  onChanged: (String? value) {
                    setState(() {
                      _selectedSound = value;
                    });
                  },
                ),
                RadioListTile<String?>(
                  title: Text('SON 3', style: TextStyle(color: Theme.of(context).textTheme.bodyText1?.color)),
                  value: 'SON 3',
                  groupValue: _selectedSound,
                  onChanged: (String? value) {
                    setState(() {
                      _selectedSound = value;
                    });
                  },
                ),
              ],
            ),
            ExpansionTile(
              backgroundColor: Theme.of(context).backgroundColor,
              collapsedBackgroundColor: Theme.of(context).backgroundColor,
              leading: Icon(Icons.palette, color: Theme.of(context).iconTheme.color),
              title: Text(
                "Choisir les thèmes de l'application",
                style: TextStyle(color: Theme.of(context).textTheme.bodyText1?.color),
              ),
              children: <Widget>[
                RadioListTile<String?>(
                  title: Text('Thème sombre', style: TextStyle(color: Theme.of(context).textTheme.bodyText1?.color)),
                  value: 'Thème sombre',
                  groupValue: selectedTheme,
                  onChanged: (String? value) {
                    setState(() {
                      selectedTheme = value!;
                    });
                    if (value == 'Thème sombre') {
                      Provider.of<ThemeProvider>(context, listen: false).setTheme(darkTheme);
                    } else if (value == 'Thème clair') {
                      Provider.of<ThemeProvider>(context, listen: false).setTheme(lightTheme);
                    }
                  },
                ),
                RadioListTile<String?>(
                  title: Text('Thème clair', style: TextStyle(color: Theme.of(context).textTheme.bodyText1?.color)),
                  value: 'Thème clair',
                  groupValue: selectedTheme,
                  onChanged: (String? value) {
                    setState(() {
                      selectedTheme = value!;
                    });
                    if (value == 'Thème sombre') {
                      Provider.of<ThemeProvider>(context, listen: false).setTheme(darkTheme);
                    } else if (value == 'Thème clair') {
                      Provider.of<ThemeProvider>(context, listen: false).setTheme(lightTheme);
                    }
                  },
                ),
              ],
            ),
            ListTile(
              leading: Icon(Icons.edit, color: Theme.of(context).iconTheme.color),
              title: Text(
                "Améliorer l'expérience utilisateur",
                style: TextStyle(color: Theme.of(context).textTheme.bodyText1?.color),
              ),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => PreferencesPage()),
                );
              },
            ),

            ListTile(
              leading: Image(
                width:30 ,
                      image: selectedTheme == "Thème clair"? const AssetImage("assets/images/People.png"):const AssetImage("assets/images/people2.jpg"),
                    ),
              title: Text(
                "A propos de nous",
                style: TextStyle(color: Theme.of(context).textTheme.bodyText1?.color),
              ),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => AboutusPage()),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
