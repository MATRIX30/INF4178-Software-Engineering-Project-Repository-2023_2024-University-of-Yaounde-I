// ignore_for_file: non_constant_identifier_names

import 'package:flutter/material.dart';

var FIRST_THEME_COLOR = const Color.fromARGB(255, 3, 161, 195);
var SECOND_THEME_COLOR = const Color.fromARGB(255, 242, 60, 224);
var BACKGROUND_THEME_COLOR = const Color.fromARGB(255, 234, 232, 232);


var themeData=ThemeData(
      textTheme: const TextTheme(
        bodyText1: TextStyle(fontFamily: 'poppins'),
        bodyText2: TextStyle(fontFamily: 'poppins')
      )
      //fontFamily: 'poppins'
     ); 
final List<Color> avatarColors = [FIRST_THEME_COLOR, const Color.fromARGB(255, 90, 233, 67),const Color.fromARGB(255, 242, 60, 224)];
// ThemeData darkTheme() {
//   final ThemeData darkTheme = ThemeData.dark();
//   return darkTheme.copyWith(
//     scaffoldBackgroundColor: const Color.fromARGB(221, 255, 255, 255),
//     splashColor: const Color.fromARGB(255, 0, 0, 0),
//     brightness: Brightness.light,
//     cardTheme: const CardTheme(
//       color: Color.fromARGB(255, 0, 0, 0),
//     ),
//     textTheme: const TextTheme(
//       headline1: TextStyle(
//         fontSize: 20,
//         fontWeight: FontWeight.bold,
//         color: Color.fromARGB(255, 254, 255, 255),
//       ),
//       headline6: TextStyle(
//         fontSize: 10.0,
//         fontStyle: FontStyle.italic,
//         color: Color.fromARGB(255, 255, 255, 255),
//       ),
//       bodyText1: TextStyle(
//         fontSize: 10.0,
//         fontFamily: 'Georgia',
//         color: Color.fromRGBO(255, 255, 255, 1),
//       ),
//     ),
//     // cursorColor: const Color.fromRGBO(7, 28, 145, 0.95),
//   );
// }

// ThemeData lightTheme() {
//   final ThemeData lightTheme = ThemeData.light();
//   return lightTheme.copyWith(
//     primaryColor: Colors.black87,
//     secondaryHeaderColor: const Color.fromARGB(208, 233, 230, 230),
//     scaffoldBackgroundColor: Colors.black87,
//     splashColor: const Color.fromARGB(255, 82, 0, 154),
//     brightness: Brightness.light,
//     cardTheme: const CardTheme(
//       color: Colors.white,
//     ),

//     textTheme: const TextTheme(
//       headline1: TextStyle(
//         fontSize: 40,
//         fontWeight: FontWeight.w900,
//         color: Color.fromARGB(255, 0, 0, 0),
//       ),
//       headline6: TextStyle(
//         fontSize: 15.0,
//         fontStyle: FontStyle.italic,
//         color: Color.fromARGB(255, 255, 255, 255),
//       ),
//       bodyText1: TextStyle(
//         fontSize: 12.0,
//         fontFamily: 'Georgia',
//         color: Color.fromARGB(255, 255, 255, 255),
//       ),
//     ),
//     // cursorColor: const Color.fromRGBO(7, 28, 145, 0.95),
//   );
// }

final ThemeData lightTheme = ThemeData(
    cardColor:Colors.white,
    toggleableActiveColor:  Color.fromARGB(255, 29, 29, 29),

  brightness: Brightness.light,
  indicatorColor: BACKGROUND_THEME_COLOR,
  primaryColor: FIRST_THEME_COLOR,
  secondaryHeaderColor: FIRST_THEME_COLOR,
  scaffoldBackgroundColor: Colors.white,
  backgroundColor: Colors.white,
  focusColor: FIRST_THEME_COLOR,
  textTheme: const TextTheme(
    bodyText1: TextStyle(color: Colors.black),
    bodyText2: TextStyle(color: Colors.black),
  ),
  iconTheme: const IconThemeData(color: Colors.black),
  appBarTheme: const AppBarTheme(
    backgroundColor: Colors.blue,
    iconTheme: IconThemeData(color: Colors.white),
    titleTextStyle: TextStyle(color: Colors.white),
  ),
);

final ThemeData darkTheme = ThemeData(
  cardColor: Color.fromARGB(255, 36, 36, 36),
  toggleableActiveColor: Colors.white,
  brightness: Brightness.dark,
  secondaryHeaderColor: Colors.white,
  indicatorColor: Colors.black,
  primaryColor: Color.fromARGB(255, 36, 36, 36),
  
  scaffoldBackgroundColor: Colors.black,
  backgroundColor: Colors.black,
  focusColor: Colors.black,
  textTheme: const TextTheme(
    bodyText1: TextStyle(color: Colors.white),
    bodyText2: TextStyle(color: Colors.white),
  ),
  iconTheme: const IconThemeData(color: Colors.white),
  appBarTheme: const AppBarTheme(
    backgroundColor: Colors.black,
    iconTheme: IconThemeData(color: Colors.white),
    titleTextStyle: TextStyle(color: Colors.white),
  ),
);
