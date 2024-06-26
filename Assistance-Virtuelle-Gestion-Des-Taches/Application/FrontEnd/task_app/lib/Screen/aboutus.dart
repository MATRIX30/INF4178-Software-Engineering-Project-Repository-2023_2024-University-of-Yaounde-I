import 'package:flutter/material.dart';
import 'package:task_app/Utils/Themes.dart';


class AboutusPage extends StatefulWidget {
  const AboutusPage({super.key});

  @override
  State<AboutusPage> createState() => _AboutusPageState();
}

class _AboutusPageState extends State<AboutusPage> {
  List<String> contributor1 = [
    "Design des interfaces",
    "Implementation backend des fonctionnalités pour marquer une tache importante ou urgente, l'affichage des taches urgentes, l'affichage des taches importantes",
    "Implémentation backend des techniques AHP pour la gestion des préférence utilisateurs",
    "Implémentation backend des API pour les notifications via l'application",
    "Mise en place du Chatbox",
  ];

  List<String> contributor2 = [
    "Implementation de la page d'inscription",
    "Implementation de la page de connexion",
    "Implémentation de la page Profile utilisateur",
    "Implémentation de la page about us",
  ];

  List<String> contributor3 = [
    "Implémentation des interfaces notamment le Homepage, l'ajout des taches, l'affichage des taches, l'assistance virtuelle, les notifications",
    "Implémentation des thèmes de l'application ",
    "Intégration (ajout des taches, affichage des taches, Ahp, notifications)",
  ];

  List<String> contributor4 = [
    "Réalisation du WelcomeScreen",
    "Réalisation de l'interface des paramètres",
    "Réalisation des différentes interfaces permettant de récupérer les préférences de l'utilisateur",
    "Réalisation des pages de différentes fonctionnalités de tri",
  ];

  List<String> contributor5 = [
    "conception du back-end(logique métier, MCD, MLD)",
    "Implémentation des models metiers(tache, comptes, user, assistance vocale, filtrage des données)",
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor:Theme.of(context).scaffoldBackgroundColor,
        leading: IconButton(
          icon:  Icon(Icons.arrow_back_ios,
              color: FIRST_THEME_COLOR),
          onPressed: () {
           Navigator.pop(context);
          },
        ),
        title:  Row(
          children: [
            SizedBox(width: 8),
            Text(
              'A PROPOS DE NOUS',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
          ],
        ),
      ),
      body: Container(
        padding:
            const EdgeInsets.only(left: 15, top: 20, right: 15, bottom: 15),
        child: ListView(
          children: [
            Row(
              children: [
                Container(
                  width: 70,
                  height: 70,
                  decoration: BoxDecoration(
                    border: Border.all(
                        width: 1,
                        color: const Color.fromARGB(255, 3, 161, 195)),
                    boxShadow: [
                      BoxShadow(
                          spreadRadius: 2,
                          blurRadius: 10,
                          color: Colors.black.withOpacity(0.1))
                    ],
                    shape: BoxShape.circle,
                    image: const DecorationImage(
                        fit: BoxFit.cover,
                        image: AssetImage(
                          "assets/images/pru.jpg",
                        )),
                  ),
                ),
                const SizedBox(width: 10,),

                //chantal
                 Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "EBA NGOLONG Jeanne Chantal",
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text("Developpeur Fullstack",
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                        )),
                    Text("front Flutter/Backend java Spring boot")
                  ],
                )
              ],
            ),
            const SizedBox(height: 10,),
            const Text("Contributions",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                )),
                const SizedBox(height: 10,),
            ...List.generate(
                5,
                (index) => Column(
                      children: [
                        Row(
                          children: [
                            const Icon(
                              Icons.check,
                              color: Color.fromARGB(255, 3, 161, 195),
                            ),
                            Expanded(child: Text(contributor1[index]))
                          ],
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                      ],
                    )),
            const SizedBox(
              height: 30,
            ),
//agnes

            Row(
              children: [
                Container(
                  width: 70,
                  height: 70,
                  decoration: BoxDecoration(
                    border: Border.all(
                        width: 1,
                        color: const Color.fromARGB(255, 3, 161, 195)),
                    boxShadow: [
                      BoxShadow(
                          spreadRadius: 2,
                          blurRadius: 10,
                          color: Colors.black.withOpacity(0.1))
                    ],
                    shape: BoxShape.circle,
                    image: const DecorationImage(
                        fit: BoxFit.cover,
                        image: AssetImage(
                          "assets/images/agnes.jpeg",
                        )),
                  ),
                ),
                const SizedBox(width: 10,),
                 Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "MENGUE ESSOMBA Agnes Mileine",
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text("Developpeur Front",
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                        )),
                    Text("HTML CSS, Flutter")
                  ],
                )
              ],
            ),
            const SizedBox(height: 10,),
            const Text("Contributions",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                )),

                const SizedBox(height: 10,),
            ...List.generate(
                4,
                (index) => Column(
                      children: [
                        Row(
                          children: [
                            const Icon(
                              Icons.check,
                              color: Color.fromARGB(255, 3, 161, 195),
                            ),
                            Expanded(child: Text(contributor2[index]))
                          ],
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                      ],
                    )),

            const SizedBox(
              height: 30,
            ),

            //giresse
            Row(
              children: [
                Container(
                  width: 70,
                  height: 70,
                  decoration: BoxDecoration(
                    border: Border.all(
                        width: 1,
                        color: const Color.fromARGB(255, 3, 161, 195)),
                    boxShadow: [
                      BoxShadow(
                          spreadRadius: 2,
                          blurRadius: 10,
                          color: Colors.black.withOpacity(0.1))
                    ],
                    shape: BoxShape.circle,
                    image: const DecorationImage(
                        fit: BoxFit.cover,
                        image: AssetImage(
                          "assets/images/gir2.jpg",
                        )),
                  ),
                ),
                SizedBox(width: 10,),
                 Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "DONGMO Giresse",
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text("Developpeur Front",
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                        )),
                    Text("Flutter")
                  ],
                )
              ],
            ),
            const SizedBox(height: 10,),
            const Text("Contributions",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                )),
            const SizedBox(height: 10,),    
            ...List.generate(
                3,
                (index) => Column(
                      children: [
                        Row(
                          children: [
                            const Icon(
                              Icons.check,
                              color: Color.fromARGB(255, 3, 161, 195),
                            ),
                            Expanded(child: Text(contributor3[index]))
                          ],
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                      ],
                    )),

            const SizedBox(
              height: 30,
            ),

            //tegomo
            Row(
              children: [
                Container(
                  width: 70,
                  height: 70,
                  decoration: BoxDecoration(
                    border: Border.all(
                        width: 1,
                        color: const Color.fromARGB(255, 3, 161, 195)),
                    boxShadow: [
                      BoxShadow(
                          spreadRadius: 2,
                          blurRadius: 10,
                          color: Colors.black.withOpacity(0.1))
                    ],
                    shape: BoxShape.circle,
                    image: const DecorationImage(
                        fit: BoxFit.cover,
                        image: AssetImage(
                          "assets/images/du.png",
                        )),
                  ),
                ),
                const SizedBox(width: 10,),
                 Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "TEGOMO Dyvane Degar",
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text("Developpeur Front",
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                        )),
                    Text("React native, Flutter")
                  ],
                )
              ],
            ),
            const SizedBox(height: 10,),
            const Text("Contributions",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                )),
                const SizedBox(height: 10,),
            ...List.generate(
                4,
                (index) => Column(
                      children: [
                        Row(
                          children: [
                            const Icon(
                              Icons.check,
                              color: Color.fromARGB(255, 3, 161, 195),
                            ),
                            Expanded(child: Text(contributor4[index]))
                          ],
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                      ],
                    )),

            const SizedBox(
              height: 30,
            ),

            //leonel

            Row(
              children: [
                Container(
                  width: 70,
                  height: 70,
                  decoration: BoxDecoration(
                    border: Border.all(
                        width: 1,
                        color: const Color.fromARGB(255, 3, 161, 195)),
                    boxShadow: [
                      BoxShadow(
                          spreadRadius: 2,
                          blurRadius: 10,
                          color: Colors.black.withOpacity(0.1))
                    ],
                    shape: BoxShape.circle,
                    image: const DecorationImage(
                        fit: BoxFit.cover,
                        image: AssetImage(
                          "assets/images/leo.jpg",
                        )),
                  ),
                ),
                const SizedBox(width: 10,),
                 Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "DONGMO DJOUAKE Leonel MAKEN",
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text("Developpeur Fullstack",
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                        )),
                    Text("Java/Python/Flutter/Angular/ReactJs")
                  ],
                )
              ],
            ),
            const SizedBox(height: 10,),
            const Text("Contributions",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                )),
                const SizedBox(height: 10,),
            ...List.generate(
                2,
                (index) => Column(
                      children: [
                        Row(
                          children: [
                            const Icon(
                              Icons.check,
                              color: Color.fromARGB(255, 3, 161, 195),
                            ),
                            Expanded(child: Text(contributor5[index]))
                          ],
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                      ],
                    )),
          ],
        ),
      ),
    );
  }
}
