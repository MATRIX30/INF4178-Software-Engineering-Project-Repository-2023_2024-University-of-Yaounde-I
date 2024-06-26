import 'package:flutter/material.dart';
import 'package:task_app/Utils/Themes.dart';


class RappelDay extends StatefulWidget {
  bool selected;
  String letter;
   RappelDay({super.key,required this.selected,required this.letter});

  @override
  State<RappelDay> createState() => _RappelDayState();
}

class _RappelDayState extends State<RappelDay> {
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        print("selected widget");
        setState(() {
          widget.selected=!widget.selected;
        });
      },
      child: Container(
        width: 30,
        height: 30,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(color: FIRST_THEME_COLOR),
          color: widget.selected?FIRST_THEME_COLOR:Colors.white
        ),
        child: Center(
          child: Text(widget.letter,style: TextStyle(color: widget.selected?Colors.white:FIRST_THEME_COLOR,fontSize: 22),),
        ),
      ),
    );
  }
}