// ignore_for_file: unused_local_variable, depend_on_referenced_packages, avoid_print, prefer_collection_literals

import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:task_app/Utils/Global.dart';

class AHPService {
  static String query = '';

  static Future<Object> calculateAhp(idCompte,iu,id,ih,ud,uh,dh) async {
    try {
      query = '$root/api/ahp/calculate';
      var requestBody = {
        "compte": {
          "idCompte": idCompte,
        },
        "matrix": [
          ["1", iu.toString(), id.toString(), ih.toString()],
          [(1/iu).toString(), "1", ud.toString(), uh.toString()],
          [(1/id).toString(), (1/ud).toString(), "1", dh.toString()],
          [(1/ih).toString(), (1/uh).toString(), (1/dh).toString(), "1"]
        ]
      };

      var response = await http.post(
        Uri.parse(query),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(requestBody),
      );

      if (response.statusCode == 200) {
        print("C'est propre");
        return "success";
      } else {
        print("Pas bon");
        return "Error";
      }
    } catch (e) {
      print("Vraiment pas bon");
      print(e);
      return "Erros";
    }
  }
}
