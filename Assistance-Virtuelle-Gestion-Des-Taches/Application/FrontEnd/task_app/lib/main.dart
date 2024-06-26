import 'package:flutter/material.dart';
import 'package:task_app/Screen/WelcomePage.dart';
import 'package:task_app/Utils/Themes.dart';
import 'package:provider/provider.dart';
import 'package:task_app/Utils/themeProvider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => ThemeProvider(lightTheme),
      child: const MyApp(),
    ),
  );
}
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
   return Consumer<ThemeProvider>(
      builder: (context, themeProvider, child) {
        return MaterialApp(
          title: 'Task App',
          debugShowCheckedModeBanner: false,
          theme: themeProvider.themeData,
          home: const WelcomePage(),
        );
      },
    );
  }
}

