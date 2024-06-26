// ignore_for_file: avoid_print, depend_on_referenced_packages, prefer_collection_literals

import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:task_app/Models/Tache.dart';
import 'package:task_app/Utils/Global.dart';

class TacheService {
  static String query = "";

  static Future<String> createTask(nom, description, dateDebut, dateEcheance,
      heureDebut, heureFin, idAccount) async {
    try {
      var map = Map<String, dynamic>();

      map['name'] = nom.toString();
      map['description'] = description.toString();
      map['dateDebut'] = dateDebut.toString();
      map['dateEcheance'] = dateEcheance.toString();
      map['heureDebut'] = heureDebut.toString();
      map['heureFin'] = heureFin.toString();

      map['compteId'] = idAccount.toString();

      query = "$root/taches/create";

      print("l'url:$query");
      print("Le map--------:$map");

      final response = await http.post(
        Uri.parse(query),
        body: map,
      );
      print('addTask Response: ${response.statusCode}');
      print('addTask Body: ${response.body}');

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

  static Future<String> deleteTask(idTaks) async {
    try {
      var map = Map<String, dynamic>();

     

      query = "$root/taches/delete/$idTaks";

      print("l'url:$query");
      print("Le map--------:$map");

      final response = await http.delete(
        Uri.parse(query),
        body: map,
      );
      print('deleteTask Response: ${response.statusCode}');
      print('deleteTask Body: ${response.body}');

      if (204 == response.statusCode || 200 == response.statusCode) {
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

  static Future<String> updateTask(idTask, nom, description, dateDebut,
      dateEcheance, heureDebut, heureFin, idAccount) async {
    try {
      var map = Map<String, dynamic>();

      map['name'] = nom.toString();
      map['description'] = description.toString();
      map['dateDebut'] = dateDebut.toString();
      map['dateEcheance'] = dateEcheance.toString();
      map['heureDebut'] = heureDebut.toString();
      map['heureFin'] = heureFin.toString();

      map['compteId'] = idAccount.toString();

      query = "$root/taches/update/$idTask";

      print("l'url:$query");
      print("Le map--------:$map");

      final response = await http.put(
        Uri.parse(query),
        body: map,
      );
      print('addTask Response: ${response.statusCode}');
      print('addTask Body: ${response.body}');

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

  static Future<String> setTaskImportant(idTask,isImportant) async {
    try {
      var map = Map<String, dynamic>();

      
    

      query = "$root/taches/$idTask/$isImportant/mark";

      print("l'url:$query");
      print("Le map--------:$map");

      final response = await http.put(
        Uri.parse(query),
        body: map,
      );
      print('setTaskImportant Response: ${response.statusCode}');
      print('setTaskImportant Body: ${response.body}');

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

  static Future<String> setTaskTerminee(idTask) async {
    try {
      var map = Map<String, dynamic>();

     
    

      query = "$root/taches/$idTask/terminer";

      print("l'url:$query");
      print("Le map--------:$map");

      final response = await http.put(
        Uri.parse(query),
        body: map,
      );
      print('setTaskTerminee Response: ${response.statusCode}');
      print('setTaskTerminee Body: ${response.body}');

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

  static List<Tache> parseResponseTaches(String responseBody) {
    final parsed = json.decode(responseBody).cast<Map<String, dynamic>>();
    return parsed.map<Tache>((json) => Tache.fromJson(json)).toList();
  }

  static Future<List<Tache>> getAllTaches(idAccount) async {
    try {
      var map = Map<String, dynamic>();
      query = '$root/taches/compte/$idAccount';

      print("Le map--------:$map");

      final response = await http.get(
        Uri.parse(query),
      );
      print('getAllTaches Response: ${response.statusCode}');
      print('getAllTaches Body: ${response.body}');

      if (200 == response.statusCode) {
        print("C'est propre");
        List<Tache> list = parseResponseTaches(response.body);

        return list;
      } else {
        print("Pas bon");
        return <Tache>[];
      }
    } catch (e) {
      print("Vraimemnt pas bon");
      print(e);
      return <Tache>[];
    }
  }

  static Future<List<Tache>> getAllTachesUrgentes(idAccount) async {
    try {
      var map = Map<String, dynamic>();
      query = '$root/taches/compte/$idAccount/Urgente';

      print("Le map--------:$map");

      final response = await http.get(
        Uri.parse(query),
      );
      print('getAllTachesUrgentes Response: ${response.statusCode}');
      print('getAllTachesUrgentes Body: ${response.body}');

      if (200 == response.statusCode) {
        print("C'est propre");
        List<Tache> list = parseResponseTaches(response.body);

        return list;
      } else {
        print("Pas bon");
        return <Tache>[];
      }
    } catch (e) {
      print("Vraimemnt pas bon");
      print(e);
      return <Tache>[];
    }
  }

  static Future<List<Tache>> getAllTachesImportantes(idAccount) async {
    try {
      var map = Map<String, dynamic>();
      query = '$root/taches/compte/$idAccount/Importante';

      print("Le map--------:$map");

      final response = await http.get(
        Uri.parse(query),
      );
      print('getAllTachesImportantes Response: ${response.statusCode}');
      print('getAllTachesImportantes Body: ${response.body}');

      if (200 == response.statusCode) {
        print("C'est propre");
        List<Tache> list = parseResponseTaches(response.body);

        return list;
      } else {
        print("Pas bon");
        return <Tache>[];
      }
    } catch (e) {
      print("Vraimemnt pas bon");
      print(e);
      return <Tache>[];
    }
  }

  static Future<List<Tache>> getAllTachesTermines(idAccount) async {
    try {
      var map = Map<String, dynamic>();
      query = '$root/taches/compte/$idAccount/terminees';

      print("Le map--------:$map");

      final response = await http.get(
        Uri.parse(query),
      );
      print('getAllTachesTermines Response: ${response.statusCode}');
      print('getAllTachesTermines Body: ${response.body}');

      if (200 == response.statusCode) {
        print("C'est propre");
        List<Tache> list = parseResponseTaches(response.body);

        return list;
      } else {
        print("Pas bon");
        return <Tache>[];
      }
    } catch (e) {
      print("Vraimemnt pas bon");
      print(e);
      return <Tache>[];
    }
  }

  static Future<List<Tache>> getAllTachesOrdreAlphabetique(idAccount) async {
    try {
      var map = Map<String, dynamic>();
      query = '$root/taches/alphabetical/$idAccount';

      print("Le map--------:$map");

      final response = await http.get(
        Uri.parse(query),
      );
      print('getAllTachesOrdreAlphabetique Response: ${response.statusCode}');
      print('getAllTachesOrdreAlphabetique Body: ${response.body}');

      if (200 == response.statusCode) {
        print("C'est propre");
        List<Tache> list = parseResponseTaches(response.body);

        return list;
      } else {
        print("Pas bon");
        return <Tache>[];
      }
    } catch (e) {
      print("Vraimemnt pas bon");
      print(e);
      return <Tache>[];
    }
  }

  static Future<List<Tache>> getAllTachesEnCours(idAccount) async {
    try {
      var map = Map<String, dynamic>();
      query = '$root/taches/compte/$idAccount/encours';

      print("Le map--------:$map");

      final response = await http.get(
        Uri.parse(query),
      );
      print('getAllTachesEnCours Response: ${response.statusCode}');
      print('getAllTachesEnCours Body: ${response.body}');

      if (200 == response.statusCode) {
        print("C'est propre");
        List<Tache> list = parseResponseTaches(response.body);

        return list;
      } else {
        print("Pas bon");
        return <Tache>[];
      }
    } catch (e) {
      print("Vraimemnt pas bon");
      print(e);
      return <Tache>[];
    }
  }

  static Future<List<Tache>> getAllTachesParDateCreation(idAccount) async {
    try {
      var map = Map<String, dynamic>();
      query = '$root/taches/compte/$idAccount/par-date-creation';

      print("Le map--------:$map");

      final response = await http.get(
        Uri.parse(query),
      );
      print('getAllTachesParDate Response: ${response.statusCode}');
      print('getAllTachesParDate Body: ${response.body}');

      if (200 == response.statusCode) {
        print("C'est propre");
        List<Tache> list = parseResponseTaches(response.body);

        return list;
      } else {
        print("Pas bon");
        return <Tache>[];
      }
    } catch (e) {
      print("Vraimemnt pas bon");
      print(e);
      return <Tache>[];
    }
  }

  static Future<List<Tache>> getAllTachesParDateEcheance(idAccount) async {
    try {
      var map = Map<String, dynamic>();
      query = '$root/taches/compte/$idAccount/par-date-echeance';

      print("Le map--------:$map");

      final response = await http.get(
        Uri.parse(query),
      );
      print('getAllTachesParDate Response: ${response.statusCode}');
      print('getAllTachesParDate Body: ${response.body}');

      if (200 == response.statusCode) {
        print("C'est propre");
        List<Tache> list = parseResponseTaches(response.body);

        return list;
      } else {
        print("Pas bon");
        return <Tache>[];
      }
    } catch (e) {
      print("Vraimemnt pas bon");
      print(e);
      return <Tache>[];
    }
  }

  static Future<List<Tache>> getAllTachesParHeure(idAccount) async {
    try {
      var map = Map<String, dynamic>();
      query = '$root/taches/compte/$idAccount/par-heure';

      print("Le map--------:$map");

      final response = await http.get(
        Uri.parse(query),
      );
      print('getAllTachesParDate Response: ${response.statusCode}');
      print('getAllTachesParDate Body: ${response.body}');

      if (200 == response.statusCode) {
        print("C'est propre");
        List<Tache> list = parseResponseTaches(response.body);

        return list;
      } else {
        print("Pas bon");
        return <Tache>[];
      }
    } catch (e) {
      print("Vraimemnt pas bon");
      print(e);
      return <Tache>[];
    }
  }

   static Future<List<Tache>> getAllTachesTerminneesUrgentes(idAccount) async {
    try {
      var map = Map<String, dynamic>();
      query = '$root/taches/compte/$idAccount/Termine/Urgente';

      print("Le map--------:$map");

      final response = await http.get(
        Uri.parse(query),
      );
      print('getAllTachesUrgentes Response: ${response.statusCode}');
      print('getAllTachesUrgentes Body: ${response.body}');

      if (200 == response.statusCode) {
        print("C'est propre");
        List<Tache> list = parseResponseTaches(response.body);

        return list;
      } else {
        print("Pas bon");
        return <Tache>[];
      }
    } catch (e) {
      print("Vraimemnt pas bon");
      print(e);
      return <Tache>[];
    }
  }

   static Future<List<Tache>> getAllTachesTermineeImportantes(idAccount) async {
    try {
      var map = Map<String, dynamic>();
      query = '$root/taches/compte/$idAccount/Termine/Importante';

      print("Le map--------:$map");

      final response = await http.get(
        Uri.parse(query),
      );
      print('getAllTachesUrgentes Response: ${response.statusCode}');
      print('getAllTachesUrgentes Body: ${response.body}');

      if (200 == response.statusCode) {
        print("C'est propre");
        List<Tache> list = parseResponseTaches(response.body);

        return list;
      } else {
        print("Pas bon");
        return <Tache>[];
      }
    } catch (e) {
      print("Vraimemnt pas bon");
      print(e);
      return <Tache>[];
    }
  }

}
