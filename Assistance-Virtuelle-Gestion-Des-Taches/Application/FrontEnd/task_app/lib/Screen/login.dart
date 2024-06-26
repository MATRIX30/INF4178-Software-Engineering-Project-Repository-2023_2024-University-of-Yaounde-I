import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:task_app/Models/User.dart';
import 'package:task_app/Screen/AppAndBottomBar.dart';
import 'package:task_app/Screen/register.dart';
import 'package:task_app/Services/UserService.dart';
import 'package:task_app/Utils/Themes.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final formKey = GlobalKey<FormState>();
  bool okpassword = false;
  bool okmail = false;
  bool okrpassword = false;
  bool viewpassword = false;

  final _emailController = TextEditingController();

  final _passwordController = TextEditingController();

  _showSnackBar(String message, Color color) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
          width: 300,
          elevation: 5,
          behavior: SnackBarBehavior.floating,
          // action: SnackBarAction(
          //   label: 'Fermer',
          //   onPressed: () {},
          //   textColor: Colors.white,
          // ),
          dismissDirection: DismissDirection.down,
          backgroundColor: color,
          content: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                message,
                style: const TextStyle(
                    color: Colors.white, fontWeight: FontWeight.w500),
              ),
            ],
          )),
    );
  }

  login() {
    Userservice.login(_emailController.text, _passwordController.text)
        .then((value) {
      if (value != "Error" && value != "Errors") {
        var j = json.decode("$value");
        print("lejson $j");
        if (j == false) {
          _showSnackBar("Entrer les informatikons valides.", Colors.red);
        } else {
          User.instance = User.fromjson(j);
          Navigator.push(context,
              MaterialPageRoute(builder: (context) =>  AppAndBottomBar(selectedIndex: 0,)));
        }
      } else if (value == "Error") {
        _showSnackBar("Entrer les informatikons valides.", Colors.red);
      } else {
        _showSnackBar("Erreur connexion au serveur.", Colors.red);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor:Theme.of(context).scaffoldBackgroundColor,
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios,
            color: FIRST_THEME_COLOR,
          ),
          onPressed: () {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => RegisterPage()));
          },
        ),
        title: Row(
          children: [
            Image.asset(
              'assets/images/logo.png',
              height: 37,
              width: 32,
            ),
            const SizedBox(width: 8),
             Text(
              'My Assistance Task',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color:Theme.of(context).textTheme.bodyText1?.color,
              ),
            ),
          ],
        ),
      ),
      body: Form(
        key: formKey,
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 16),
                const Center(
                  child: SizedBox(
                    width: 250,
                    height: 230,
                    child: Image(
                      image: AssetImage("assets/images/logo.png"),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                // const Center(
                //   child: Text(
                //     "Connectez-vous",
                //     style: TextStyle(
                //       fontSize: 20,
                //       fontWeight: FontWeight.bold,
                //     ),
                //   ),
                // ),

                const SizedBox(height: 16),

                Container(
                  margin: const EdgeInsets.only(left: 15, right: 15),
                  child: Row(
                    children: [
                      Container(
                        height: 59,
                        width: 59,
                        decoration: const BoxDecoration(
                            color: Color.fromARGB(255, 3, 161, 195),
                            borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(15),
                                bottomLeft: Radius.circular(15))),
                        child: Center(
                          child: Image.asset(
                            'assets/images/arobase.png',
                            width: 24, // Définit la largeur souhaitée
                            height: 24, // Définit la hauteur souhaitée
                            color: Colors.white,
                            fit: BoxFit
                                .contain, // Conserve les proportions de l'image
                          ),
                        ),
                      ),
                      Expanded(
                        child: TextFormField(
                          controller: _emailController,
                          keyboardType: TextInputType.emailAddress,
                          onChanged: (value) {
                            okmail = value.isNotEmpty;
                          },
                          decoration: const InputDecoration(
                            hintText: "Votre mail",
                            labelText: "mail",
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.only(
                                  topRight: Radius.circular(15),
                                  bottomRight: Radius.circular(15)),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 16),

                Container(
                  margin: const EdgeInsets.only(left: 15, right: 15),
                  child: Row(
                    children: [
                      Container(
                        height: 59,
                        width: 59,
                        decoration: BoxDecoration(
                            color: FIRST_THEME_COLOR,
                            borderRadius: const BorderRadius.only(
                                topLeft: Radius.circular(15),
                                bottomLeft: Radius.circular(15))),
                        child: Center(
                          child: Image.asset(
                            'assets/images/key.png',
                            width: 24, // Définit la largeur souhaitée
                            height: 24, // Définit la hauteur souhaitée
                            color: Colors.white,
                            fit: BoxFit
                                .contain, // Conserve les proportions de l'image
                          ),
                        ),
                      ),
                      Expanded(
                        child: TextFormField(
                          keyboardType: TextInputType.text,
                          obscureText: !viewpassword,
                          controller: _passwordController,
                          onChanged: (value) {
                            okpassword = value.isNotEmpty;
                          },
                          decoration: InputDecoration(
                            suffixIcon: IconButton(
                                onPressed: () {
                                  setState(() {
                                    viewpassword = !viewpassword;
                                  });
                                },
                                icon: const Icon(Icons.remove_red_eye)),
                            hintText: "Votre mot de passe",
                            labelText: "mot de passe",
                            border: const OutlineInputBorder(
                              borderRadius: BorderRadius.only(
                                  topRight: Radius.circular(15),
                                  bottomRight: Radius.circular(15)),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                // Ajoutez ici d'autres champs de formulaire
                const SizedBox(height: 20),
                Center(
                  child: Container(
                    margin: const EdgeInsets.only(top: 25.0),
                    child: ElevatedButton(
                      onPressed: () {
                        if (okpassword && okmail) {
                          login();
                        } else {
                          _showSnackBar(
                              "veuillez remplir les champs", Colors.red);
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: FIRST_THEME_COLOR,
                        padding: const EdgeInsets.symmetric(
                            vertical: 20, horizontal: 100),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(
                              15.0), // Ajout du BorderRadius
                        ),
                        elevation: 5, // Ajout du boxShadow
                        shadowColor: Colors.grey.withOpacity(0.8),
                      ),
                      child: const Text(
                        "Se connecter",
                        style: TextStyle(
                          fontSize: 22,
                        ),
                      ),
                    ),
                  ),
                ),
                SizedBox(
                  height: 70,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text("Vous n'avez pas encore de compte?"),
                      TextButton(
                          onPressed: () {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => RegisterPage()));
                          },
                          child: Text(
                            "S'inscrire",
                            style: TextStyle(color: FIRST_THEME_COLOR),
                          ))
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
