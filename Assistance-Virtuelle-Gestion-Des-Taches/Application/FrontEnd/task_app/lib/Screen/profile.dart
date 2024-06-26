import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import 'package:task_app/Models/User.dart';
import 'package:task_app/Screen/login.dart';
import 'package:task_app/Services/UserService.dart';
import 'package:task_app/Utils/Themes.dart';
import 'package:task_app/Widgets/PikImage.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final _formKey = GlobalKey<FormState>();
  String? _name;
  String? _firstName;
  String? _phoneNumber;
  String? _password;

  final TextEditingController _nomController = TextEditingController();
  final TextEditingController _prenomController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _telephoneController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  // ignore: avoid_init_to_null
  File? photoProfile = null;
  File? photoProfileFinale = null;

  Future<File?> _getImageFromGallery() async {
    final image = await ImagePicker().pickImage(source: ImageSource.gallery);

    if (image == null) return null;

    File imageFile = File(image.path);
    return imageFile;
  }

  void showDeletionDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          content: Container(
            height: 1,
            margin: const EdgeInsets.only(top: 40, left: 10, right: 10),
            decoration:
                const BoxDecoration(color: Color.fromARGB(255, 37, 37, 37)),
          ),
          title: const Text('Voulez-vous vraiment supprimer votre compte ?'),
          actions: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                TextButton(
                  onPressed: () async {
                    final result =
                        await Userservice.deleteAccount(User.instance!.id);
                    if (result == "success") {
                      // ignore: use_build_context_synchronously
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const LoginPage()));
                    } else {
                      // Afficher un message d'erreur
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content:
                              Text('Erreur lors de la suppression du compte'),
                        ),
                      );
                    }
                    Navigator.of(context).pop();
                  },
                  child: const Text(
                    'Oui',
                    style: TextStyle(color: Colors.blue),
                  ),
                ),
                TextButton(
                  onPressed: () {
                    // Logique de suppression
                    Navigator.of(context).pop();
                  },
                  child: const Text(
                    'Non',
                    style: TextStyle(color: Colors.blue),
                  ),
                ),
              ],
            )
          ],
        );
      },
    );
  }

  void showPickImageDialog() async {
    var result =
        await showDialog(context: context, builder: (_) => const PickImage());
    if (result is File) {
      setState(() {
        photoProfile = result;
      });
    }
  }

  update() {
    Userservice.updateaccount(User.instance!.id, _emailController.text,
            _nomController.text, _prenomController.text)
        .then((value) {
      if (value == "success") {
        setState(() {
          User.instance!.firstName = _nomController.text;
          User.instance!.lastName = _prenomController.text;
          User.instance!.email = _emailController.text;
        });
      }
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _nomController.text = User.instance!.firstName;
    _prenomController.text = User.instance!.lastName;
    _emailController.text = User.instance!.email;
    _telephoneController.text = "657342845";
    _passwordController.text = "12345";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).backgroundColor,
      appBar: AppBar(
        backgroundColor:Theme.of(context).backgroundColor,
        elevation: 0,
        leadingWidth: 200,
        leading: Row(
          children: [
            IconButton(
              icon: const Icon(Icons.arrow_back_ios,
                  color: Color.fromARGB(255, 3, 161, 195)),
              onPressed: () {
                // Ajouter la logique pour naviguer vers la page précédente
                Navigator.of(context).pop();
              },
            ),
             Text(
              'Back',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Theme.of(context).iconTheme.color,
              ),
            ),
          ],
        ),
      ),
      body: Container(
        padding: const EdgeInsets.only(left: 15, top: 20, right: 15),
        child: GestureDetector(
          onTap: () {
            FocusScope.of(context).unfocus();
          },
          child: ListView(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  Text(
                    "Modifiez Votre Profile",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 20.0,
                    ),
                  ),
                  Icon(
                    Icons.edit,
                    color: Color.fromARGB(255, 3, 161, 195),
                  )
                ],
              ),
              const SizedBox(
                height: 30,
              ),
              Center(
                child: Stack(
                  children: [
                    Container(
                      width: 152,
                      height: 147,
                      decoration: BoxDecoration(
                        border: Border.all(width: 4, color: Colors.white),
                        boxShadow: [
                          BoxShadow(
                              spreadRadius: 2,
                              blurRadius: 10,
                              color: Colors.black.withOpacity(0.1))
                        ],
                        shape: BoxShape.circle,
                        image: photoProfile == null
                            ? const DecorationImage(
                                fit: BoxFit.cover,
                                image: AssetImage("assets/images/tof.jpeg"))
                            : DecorationImage(
                                image: FileImage(photoProfile!),
                                fit: BoxFit.cover),
                      ),
                    ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: GestureDetector(
                        onTap: () async {
                          showPickImageDialog();
                        },
                        child: Container(
                          height: 45,
                          width: 45,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(
                              width: 4,
                              color: Colors.white,
                            ),
                            color: FIRST_THEME_COLOR,
                          ),
                          child: const Icon(
                            Icons.add,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(
                height: 30,
              ),
              Container(
                padding: const EdgeInsets.all(22),
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      TextFormField(
                        autovalidateMode: AutovalidateMode.onUserInteraction,
                        style: const TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 20),
                        controller: _nomController,
                        decoration: const InputDecoration(
                          labelText: 'Nom',
                          labelStyle: TextStyle(fontWeight: FontWeight.normal),
                          enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(
                              color: Color.fromARGB(255, 3, 161,
                                  195), // Couleur rose pour la bordure inférieure
                            ),
                          ),
                          focusedBorder: UnderlineInputBorder(
                            borderSide: BorderSide(
                              color: Color.fromARGB(255, 3, 161,
                                  195), // Couleur rose pour la bordure inférieure lorsque le champ est sélectionné
                            ),
                          ),
                        ),
                        validator: (value) {
                          if (value?.isEmpty ?? true) {
                            return 'Veuillez entrer votre nom';
                          }
                          return null;
                        },
                        onSaved: (value) {
                          _name = value;
                        },
                      ),
                      const SizedBox(height: 16),
                      TextFormField(
                        autovalidateMode: AutovalidateMode.onUserInteraction,
                        style: const TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 20),
                        controller: _prenomController,
                        decoration: const InputDecoration(
                          labelStyle: TextStyle(fontWeight: FontWeight.normal),
                          labelText: 'Prénom',
                          enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(
                              color: Color.fromARGB(255, 3, 161,
                                  195), // Couleur rose pour la bordure inférieure
                            ),
                          ),
                          focusedBorder: UnderlineInputBorder(
                            borderSide: BorderSide(
                              color: Color.fromARGB(255, 3, 161,
                                  195), // Couleur rose pour la bordure inférieure lorsque le champ est sélectionné
                            ),
                          ),
                        ),
                        validator: (value) {
                          if (value?.isEmpty ?? true) {
                            return 'Veuillez entrer votre prénom';
                          }
                          return null;
                        },
                        onSaved: (value) {
                          _firstName = value;
                        },
                      ),
                      const SizedBox(height: 16),
                      TextFormField(
                        readOnly: true,
                        autovalidateMode: AutovalidateMode.onUserInteraction,
                        style: const TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 20),
                        controller: _emailController,
                        decoration: const InputDecoration(
                          //enabled: false,
                          labelStyle: TextStyle(fontWeight: FontWeight.normal),
                          labelText: 'Adresse mail',

                          disabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(
                              color: Color.fromARGB(255, 3, 161,
                                  195), // Couleur rose pour la bordure inférieure
                            ),
                          ),
                          enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(
                              color: Color.fromARGB(255, 3, 161,
                                  195), // Couleur rose pour la bordure inférieure
                            ),
                          ),
                          focusedBorder: UnderlineInputBorder(
                            borderSide: BorderSide(
                              color: Color.fromARGB(255, 3, 161,
                                  195), // Couleur rose pour la bordure inférieure lorsque le champ est sélectionné
                            ),
                          ),
                        ),
                        keyboardType: TextInputType.emailAddress,
                        onSaved: (value) {
                          _phoneNumber = value;
                        },
                      ),
                      const SizedBox(height: 16),
                      TextFormField(
                        autovalidateMode: AutovalidateMode.onUserInteraction,
                        style: const TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 20),
                        controller: _telephoneController,
                        decoration: const InputDecoration(
                          labelStyle: TextStyle(fontWeight: FontWeight.normal),
                          labelText: 'Numéro de téléphone',
                          enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(
                              color: Color.fromARGB(255, 3, 161,
                                  195), // Couleur rose pour la bordure inférieure
                            ),
                          ),
                          focusedBorder: UnderlineInputBorder(
                            borderSide: BorderSide(
                              color: Color.fromARGB(255, 3, 161,
                                  195), // Couleur rose pour la bordure inférieure lorsque le champ est sélectionné
                            ),
                          ),
                        ),
                        keyboardType: TextInputType.phone,
                        validator: (value) {
                          if (value?.isEmpty ?? true) {
                            return 'Veuillez entrer votre numéro de téléphone';
                          }
                          return null;
                        },
                        onSaved: (value) {
                          _phoneNumber = value;
                        },
                      ),
                      const SizedBox(height: 16),
                      TextFormField(
                        autovalidateMode: AutovalidateMode.onUserInteraction,
                        style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 20,
                            letterSpacing: 10),
                        controller: _passwordController,
                        decoration: const InputDecoration(
                          labelStyle: TextStyle(
                              fontWeight: FontWeight.normal, letterSpacing: 0),
                          labelText: 'Mot de passe',
                          //suffixIcon: const Icon(Icons.remove_red_eye),
                          enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(
                              color: Color.fromARGB(255, 3, 161,
                                  195), // Couleur rose pour la bordure inférieure
                            ),
                          ),
                          focusedBorder: UnderlineInputBorder(
                            borderSide: BorderSide(
                              color: Color.fromARGB(255, 3, 161, 195),
                              // Couleur rose pour la bordure inférieure lorsque le champ est sélectionné
                            ),
                          ),
                        ),
                        obscureText: true,
                        obscuringCharacter: "*",
                        validator: (value) {
                          if (value?.isEmpty ?? true) {
                            return 'Veuillez entrer un mot de passe';
                          }
                          return null;
                        },
                        onSaved: (value) {
                          _password = value;
                        },
                      ),
                      const SizedBox(height: 50),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          ElevatedButton(
                            onPressed: () {
                              if (_formKey.currentState?.validate() ?? false) {
                                _formKey.currentState?.save();
                                // Logique de modification
                                update();
                              }
                            },
                            style: ElevatedButton.styleFrom(
                              padding: const EdgeInsets.symmetric(
                                  vertical: 20, horizontal: 50),
                              backgroundColor: FIRST_THEME_COLOR,
                              shadowColor: FIRST_THEME_COLOR,
                              elevation: 8,
                              shape: RoundedRectangleBorder(
                                borderRadius:
                                    BorderRadius.circular(20), // Moins arrondi
                              ),
                              foregroundColor: Colors
                                  .white, // Set the background color to pink
                            ),
                            child: const Text('Modifier'),
                          ),
                          const SizedBox(
                            width: 10,
                          ),
                          ElevatedButton(
                            onPressed: () {
                              showDeletionDialog();
                            },
                            style: ElevatedButton.styleFrom(
                              padding: const EdgeInsets.symmetric(
                                  vertical: 20, horizontal: 50),
                              backgroundColor: FIRST_THEME_COLOR,
                              shadowColor: FIRST_THEME_COLOR,
                              elevation: 8,
                              shape: RoundedRectangleBorder(
                                borderRadius:
                                    BorderRadius.circular(20), // Moins arrondi
                              ),
                              foregroundColor: Colors
                                  .white, // Set the background color to pink
                            ),
                            child: const Text(
                              'Supprimer',
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
