// ignore_for_file: unused_local_variable, depend_on_referenced_packages, avoid_print, prefer_collection_literals

import 'package:http/http.dart' as http;
import 'package:task_app/Utils/Global.dart';



class Userservice {
  static String query = '';

  static Future<Object> register(mail, nom, prenom, numero, password) async {
    try {
      var map = Map<String, dynamic>();
      query = "$root/comptes/create";
      map["mail"] = mail.toString();
      map["password"] = password.toString();
      map["numero"] = numero.toString();
      map["nom"] = nom.toString();
      map["prenom"] = prenom.toString();
      print("map: $map");
      print("l'Url: $query");

      final response = await http.post(Uri.parse(query), body: map);
      print("RegisterStatuCode: ${response.statusCode}");
      print("RegisterBody: ${response.body}");
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

  static Future<Object> login(email, password) async {
    try {
      var map = Map<String, dynamic>();
      query = "$root/comptes/authenticate";
      map["mail"] = email.toString();
      map["password"] = password.toString();
      print("map: $map");
      print("l'Url: $query");
      final response = await http.post(Uri.parse(query), body: map);
      if (response.statusCode == 200) {
        print("C'est propre");
        return response.body;
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

  static Future<Object> updateaccount(id, mail, nom, prenom) async {
    try {
      var map = Map<String, dynamic>();
      query = "$root/comptes/update/$id";
      map["mail"] = mail.toString();
      map["nom"] = nom.toString();
      map["prenom"] = prenom.toString();
      print("map: $map");
      print("l'Url: $query");

      final response = await http.put(Uri.parse(query), body: map);
      print("updateaccounttatuCode: ${response.statusCode}");
      print("updateaccountBody: ${response.body}");
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

   static Future<Object> deleteAccount(id) async {
    try {
      query = "$root/comptes/delete/$id";
      final response = await http.delete(Uri.parse(query));
      print("deleteAccountStatusCode: ${response.statusCode}");
      print("deleteAccountBody: ${response.body}");
      if (response.statusCode == 200 || response.statusCode == 204) {
        print("Compte supprimé avec succès");
        return "success";
      } else {
        print("Erreur lors de la suppression du compte");
        return "Error";
      }
    } catch (e) {
      print("Erreur lors de la suppression du compte : $e");
      return "Error";
    }
  }
}
