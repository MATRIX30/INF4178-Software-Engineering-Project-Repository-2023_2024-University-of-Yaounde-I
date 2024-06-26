// ignore_for_file: unused_local_variable, depend_on_referenced_packages, avoid_print, prefer_collection_literals

import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:task_app/Models/Notification.dart';
import 'package:task_app/Utils/Global.dart';

class OtherServices {
  static String query = '';

  static List<Notifications> parseResponseNotificationss(String responseBody) {
    final parsed = json.decode(responseBody).cast<Map<String, dynamic>>();
    return parsed
        .map<Notifications>((json) => Notifications.fromJson(json))
        .toList();
  }

  static Future<List<Notifications>> getAllNotifications(int idAccount) async {
    try {
      String query = "$root/api/ahp/getcomparisonMatrix/$idAccount";
      final response = await http.get(Uri.parse(query));

      print('getMatrice Response: ${response.statusCode}');
      print('getMatrice Body: ${response.body}');

      if (response.statusCode == 200) {
        var matrix = jsonDecode(response.body);

        var requestBody = {
          "compte": {"idCompte": idAccount},
          "matrix": matrix,
        };

        print("Request Body:");
        print(requestBody);

        // Utilisation d'une requête POST au lieu de GET pour envoyer des données complexes
        query = '$root/api/notification/scheduleTask/$idAccount';
        final secondResponse = await http.post(
          Uri.parse(query),
          headers: {"Content-Type": "application/json"},
          body: jsonEncode(requestBody),
        );

        print('getAllNotifications Response: ${secondResponse.statusCode}');
        print('getAllNotifications Body: ${secondResponse.body}');

        if (secondResponse.statusCode == 200) {
          print("Success");
          List<Notifications> list =
              parseResponseNotificationss(secondResponse.body);
          return list;
        } else {
          print("Error in second response");
          return <Notifications>[];
        }
      } else {
        query = '$root/api/notification/scheduleTask/$idAccount';
        final secondResponse = await http.post(
          Uri.parse(query),
          headers: {"Content-Type": "application/json"},
        );

        print('getAllNotifications Response: ${secondResponse.statusCode}');
        print('getAllNotifications Body: ${secondResponse.body}');

        if (secondResponse.statusCode == 200) {
          print("Success");
          List<Notifications> list =
              parseResponseNotificationss(secondResponse.body);
          return list;
        } else {
          print("Error in second response");
          return <Notifications>[];
        }
      }
    } catch (e) {
      print("Exception caught:");
      print(e);
      return <Notifications>[];
    }
  }

  static Future<String> markNotification(id) async {
    try {
      var map = Map<String, dynamic>();

      query = "$root/api/notification/$id/lu";

      print("l'url:$query");
      print("Le map--------:$map");

      final response = await http.put(
        Uri.parse(query),
        body: map,
      );
      print('markNotification Response: ${response.statusCode}');
      print('markNotification Body: ${response.body}');

      if (201 == response.statusCode || 200 == response.statusCode) {
        print("c'est propre");
        return "success";
      } else {
        print("Pas bon");
        return "error";
      }
    } catch (e) {
      print("Vraiment pas bon");
      print(e);
      return "error";
    }
  }
}
