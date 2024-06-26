import 'package:flutter/material.dart';
import 'package:task_app/Screen/AppAndBottomBar.dart';
import 'package:task_app/Screen/login.dart';
import 'package:task_app/Services/UserService.dart';
import 'package:task_app/Utils/Themes.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final formKey = GlobalKey<FormState>();
  bool okpassword = false;
  bool oktel = false;
  bool okmail = false;
  bool oknom = false;
  bool okprenom = false;
  bool okrpassword = false;
  bool viewpassword = false;
  bool okMailVerified = false;

  final _emailController = TextEditingController();
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  final _phoneNumberController = TextEditingController();
  final _passwordController = TextEditingController();
  final _repeatPasswordController = TextEditingController();

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

  register() {
    Userservice.register(
            _emailController.text,
            _firstNameController.text,
            _lastNameController.text,
            _phoneNumberController.text,
            _passwordController.text)
        .then((value) {
      if (value == "success") {
        print("compte cree avec succes");
        Navigator.push(context,
            MaterialPageRoute(builder: (context) => const LoginPage()));
      } else {
        print("Echec de l'operation");
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: AppBar(
        elevation: 0,
        backgroundColor:Theme.of(context).scaffoldBackgroundColor,
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios,
            color: FIRST_THEME_COLOR,
          ),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
        title: Row(
          children: [
            Image.asset(
              'assets/images/logo.jpeg',
              height: 37,
              width: 32,
            ),
            const SizedBox(width: 8),
             Text(
              'My Assistance Task',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Theme.of(context).textTheme.bodyText1?.color,
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
                // const Center(
                //   child: SizedBox(
                //     width: 250,
                //     height: 230,
                //     child: Image(
                //       image: AssetImage("assets/images/logo.png"),
                //     ),
                //   ),
                // ),
                const SizedBox(height: 16),
                const Center(
                  child: Text(
                    "Créer un compte",
                    style: TextStyle(
                      fontSize: 25,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),

                const SizedBox(height: 20),

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
                        child: Image.asset(
                          'assets/images/iden.png',
                          color: Colors.white,
                        ),
                      ),
                      Expanded(
                        child: TextFormField(
                          controller: _firstNameController,
                          onChanged: (value) {
                            oknom = value.isNotEmpty;
                          },
                          decoration: const InputDecoration(
                            hintText: "Votre nom",
                            labelText: "Nom",
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
                        decoration: const BoxDecoration(
                            color: Color.fromARGB(255, 3, 161, 195),
                            borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(15),
                                bottomLeft: Radius.circular(15))),
                        child: Center(
                          child: Image.asset(
                            'assets/images/utilisateur.png',
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
                          controller: _lastNameController,
                          onChanged: (value) {
                            okprenom = value.isNotEmpty;
                          },
                          decoration: const InputDecoration(
                            hintText: "Votre prenom",
                            labelText: "prenom",
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
                  margin: EdgeInsets.only(left: 15, right: 15),
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
                          onChanged: (value) {
                            okmail = value.isNotEmpty;
                            if (value != "") {
                              RegExp regExp = RegExp(
                                  r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');

                              okMailVerified = regExp.hasMatch(value);
                            }
                          },
                          keyboardType: TextInputType.emailAddress,
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
                        child: const Icon(
                          Icons.phone_android,
                          color: Colors.white,
                        ),
                      ),
                      Expanded(
                        child: TextFormField(
                          controller: _phoneNumberController,
                          onChanged: (value) {
                            oktel = value.isNotEmpty;
                          },
                          keyboardType: TextInputType.phone,
                          decoration: const InputDecoration(
                            hintText: "Votre telephone",
                            labelText: "phone",
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
                          controller: _passwordController,
                           keyboardType: TextInputType.visiblePassword,
                          obscureText: !viewpassword,
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
                          controller: _repeatPasswordController,
                          obscureText: !viewpassword,
                          keyboardType: TextInputType.visiblePassword,
                          onChanged: (value) {
                            okrpassword = value.isNotEmpty;
                          },
                          decoration: InputDecoration(
                            suffixIcon: IconButton(
                                onPressed: () {
                                  setState(() {
                                    viewpassword = !viewpassword;
                                  });
                                },
                                icon: const Icon(Icons.remove_red_eye)),
                            hintText: "repeter le mot de passe",
                            labelText: "repeter le mot de passe",
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
                        if (oknom &&
                            okprenom &&
                            oktel &&
                            okpassword &&
                            okmail &&
                            okrpassword) {
                          if (okMailVerified) {
                            if (_passwordController.text ==
                                _repeatPasswordController.text) {
                              register();
                            } else {
                              _showSnackBar(
                                  "Les mots de passe ne correspondent pas",
                                  Colors.red);
                            }
                          }else{
                             _showSnackBar(
                                  "Le format de l'email est incorrect",
                                  Colors.red);
                          }
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
                        "S'inscrire",
                        style: TextStyle(
                          fontSize: 22,
                        ),
                      ),
                    ),
                  ),
                ),

                SizedBox(
                  height: 60,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text("Vous avez deja un compte?"),
                      TextButton(
                          onPressed: () {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => LoginPage()));
                          },
                          child: Text(
                            "Se Connecter",
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
