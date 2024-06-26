import 'package:flutter/material.dart';
import 'package:task_app/Models/User.dart';
import 'package:task_app/Services/AHPSercice.dart';
import 'package:task_app/Utils/Themes.dart';

class PreferencesPage extends StatefulWidget {
  @override
  _PreferencesPageState createState() => _PreferencesPageState();
}

class _PreferencesPageState extends State<PreferencesPage> {
  int _currentPage = 0;
  final _pageController = PageController();
  bool _showErrorMessage = false;

  String? _priority1;
  String? _priority2;
  String? _priority3;
  String? _priority4;
  String? _priority5;
  String? _priority6;
  String? _subPriority1;
  String? _subPriority2;
  String? _subPriority3;
  String? _subPriority4;
  String? _subPriority5;
  String? _subPriority6;

  int? iu;
  int? id;
  int? ih;
  int? ud;
  int? uh;
  int? dh;



  calculateAHP() {

    AHPService.calculateAhp(User.instance!.id, iu, id, ih, ud, uh, dh)
        .then((value) {
          if(value=="success"){
            print("c'est bon");
          }else{
            print("pas bon echec");
          }
        });
  }

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

  void _nextPage() {
    setState(() {
      if (_currentPage < 6) {
        if (_priority1 == null && _currentPage == 0) {
          _showErrorMessage = true;
          _showSnackBar("Veullez selectionner une option", Colors.red);
          return;
        }
        if (_priority2 == null && _currentPage == 1) {
          _showErrorMessage = true;
          _showSnackBar("Veullez selectionner une option", Colors.red);
          return;
        }
        if (_priority3 == null && _currentPage == 5) {
          _showErrorMessage = true;
          _showSnackBar("Veullez selectionner une option", Colors.red);
          return;
        }
        if (_priority4 == null && _currentPage == 2) {
          _showErrorMessage = true;
          _showSnackBar("Veullez selectionner une option", Colors.red);
          return;
        }
        if (_priority5 == null && _currentPage == 3) {
          _showErrorMessage = true;
          _showSnackBar("Veullez selectionner une option", Colors.red);
          return;
        }
        if (_priority6 == null && _currentPage == 4) {
          _showErrorMessage = true;
          _showSnackBar("Veullez selectionner une option", Colors.red);
          return;
        }

        if(_currentPage==5){
          calculateAHP();
        }
        _showErrorMessage = false;
        _pageController.nextPage(
          duration: Duration(milliseconds: 300),
          curve: Curves.easeIn,
        );
      } else {
        // Handle the last step
        Navigator.pop(context); // Close the preferences screen
        // You can add more logic here to handle form submission
      }
    });
  }

  void _previousPage() {
    setState(() {
      if (_currentPage > 0) {
        _pageController.previousPage(
          duration: Duration(milliseconds: 300),
          curve: Curves.easeIn,
        );
      } else {
        Navigator.pop(context); // Close the preferences screen
      }
    });
  }

  Widget _buildPageContent({
    
    required String title,
    required String question,
    required List<Widget> options,
  }) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
         _currentPage!=6?
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              IconButton(
                icon: Icon(Icons.arrow_back, color:Theme.of(context).iconTheme.color),
                onPressed: _previousPage,
              ),
              Row(
                children: [
                  for (int i = 0; i < 6; i++)
                    Container(
                      margin: EdgeInsets.symmetric(horizontal: 4.0),
                      width: 25,
                      height: 8,
                      decoration: BoxDecoration(
                        color:
                            i <= _currentPage ? FIRST_THEME_COLOR : Colors.grey,
                        borderRadius: BorderRadius.circular(4.0),
                      ),
                    ),
                ],
              ),
              SizedBox(width: 48), // To balance the back button on the left
            ],
          ):Text(""),
        
          SizedBox(height:_currentPage==6?MediaQuery.of(context).size.height/2.4: 20),
          
         _currentPage!=6? Text(
            title,
            style: TextStyle(
              overflow:TextOverflow.visible,
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ):Center(
            child: Text(
              title,
              style: TextStyle(
                overflow: TextOverflow.clip,
                fontSize:24,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          SizedBox(height: 20),
          Text(
            question,
            style: TextStyle(fontSize: 16),
          ),
          SizedBox(height: 20),
          ...options,
        _currentPage!=6?  Spacer():Text(""),
          Align(
            alignment:_currentPage!=6? Alignment.centerRight:Alignment.center,
            child: Padding(
              padding: const EdgeInsets.only(bottom: 16.0),
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  padding:
                      const EdgeInsets.symmetric(vertical: 20, horizontal: 50),
                  backgroundColor: FIRST_THEME_COLOR,
                  shadowColor: FIRST_THEME_COLOR,
                  elevation: 8,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20), // Moins arrondi
                  ),
                  foregroundColor:
                      Colors.white, // Set the background color to pink
                ),
                onPressed: _nextPage,
                child: Text(_currentPage == 6 ? 'Terminer' : 'Suivant'),
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: PageView(
        controller: _pageController,
        onPageChanged: (index) {
          setState(() {
            _currentPage = index;
          });
        },
        children: <Widget>[
          _buildPageContent(
            title: 'Commençons ...',
            question:
                'Si vous avez deux tâches dont l\'une est marquée importante et l\'autre a un délai d\'exécution limité, dans quel ordre souhaiteriez-vous que l\'on vous rappelle les tâches :',
            options: [
              RadioListTile<String>(
                title: const Text('La tâche importante est prioritaire'),
                value: 'important',
                groupValue: _priority1,
                onChanged: (String? value) {
                  setState(() {
                    _priority1 = value;
                    _subPriority1 = null;
                  });
                },
              ),
              if (_priority1 == 'important') ...[
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: Text(
                      'A quel fréquence noteriez-vous l\'importance d\'une tâche par rapport à la durée ?'),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Importance moderée'),
                    value: 'important_1',
                    groupValue: _subPriority1,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority1 = value;
                        id=3;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Très importante'),
                    value: 'important_2',
                    groupValue: _subPriority1,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority1 = value;
                        id=5;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Vraiment très importante'),
                    value: 'important_3',
                    groupValue: _subPriority1,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority1 = value;
                        id=7;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Extrêmement importante'),
                    value: 'important_4',
                    groupValue: _subPriority1,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority1 = value;
                        id=9;
                      });
                    },
                  ),
                ),
              ],
              RadioListTile<String>(
                title: const Text(
                    'La tâche ayant une durée limitée est prioritaire'),
                value: 'limited',
                groupValue: _priority1,
                onChanged: (String? value) {
                  setState(() {
                    _priority1 = value;
                  });
                },
              ),
              if (_priority1 == 'limited') ...[
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: Text(
                      'A quelle fréquence noteriez-vous la durée par rapport à l\'importance ?'),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Importance moderée'),
                    value: 'important_1',
                    groupValue: _subPriority1,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority1 = value;
                        id=3;
                        
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Très importante'),
                    value: 'important_2',
                    groupValue: _subPriority1,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority1 = value;
                         id=5;
                        
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Vraiment très importante'),
                    value: 'important_3',
                    groupValue: _subPriority1,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority1 = value;
                         id=7;
                        
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Extrêmement importante'),
                    value: 'important_4',
                    groupValue: _subPriority1,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority1 = value;
                        id=9;
                      });
                    },
                  ),
                ),
              ],
              RadioListTile<String>(
                title: const Text('Les deux tâches sont d\'importance égales'),
                value: 'equal',
                groupValue: _priority1,
                onChanged: (String? value) {
                  setState(() {
                    _priority1 = value;
                    id=1;
                  });
                },
              ),
            ],
          ),
          _buildPageContent(
            title: 'Ensuite ...',
            question:
                "Si vous avez deux tâches dont l\'une est marquée importante et l\'autre est marquée urgente, dans quel ordre souhaiteriez-vous que l\'on vous rappelle les tâches :",
            options: [
              RadioListTile<String>(
                title: const Text('La tâche importante est prioritaire'),
                value: 'important',
                groupValue: _priority2,
                onChanged: (String? value) {
                  setState(() {
                    _priority2 = value;
                    _subPriority2 = null;
                  });
                },
              ),
              if (_priority2 == 'important') ...[
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: Text(
                      'A quel fréquence noteriez-vous l\'importance d\'une tâche par rapport à l\'urgence ?'),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Importance moderée'),
                    value: 'important_1',
                    groupValue: _subPriority2,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority2 = value;
                        iu=3;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Très importante'),
                    value: 'important_2',
                    groupValue: _subPriority2,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority2 = value;
                        iu=5;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Vraiment très importante'),
                    value: 'important_3',
                    groupValue: _subPriority2,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority2 = value;
                        iu=7;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Extrêmement importante'),
                    value: 'important_4',
                    groupValue: _subPriority2,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority2 = value;
                        iu=9;
                      });
                    },
                  ),
                ),
              ],
              RadioListTile<String>(
                title: const Text('La tâche urgente doit être prioritaire'),
                value: 'urgente',
                groupValue: _priority2,
                onChanged: (String? value) {
                  setState(() {
                    _priority2 = value;
                  });
                },
              ),
              if (_priority2 == 'urgente') ...[
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: Text(
                      "A quelle fréquence noteriez-vous l\'urgence de la tache par rapport à l'importance ?"),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Importance moderée'),
                    value: 'important_1',
                    groupValue: _subPriority2,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority2 = value;
                        iu=3;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Très importante'),
                    value: 'important_2',
                    groupValue: _subPriority2,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority2 = value;
                        iu=5;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Vraiment très importante'),
                    value: 'important_3',
                    groupValue: _subPriority2,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority2 = value;
                        iu=7;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Extrêmement importante'),
                    value: 'important_4',
                    groupValue: _subPriority2,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority2 = value;
                        iu=9;
                      });
                    },
                  ),
                ),
              ],
              RadioListTile<String>(
                title: const Text('Les deux tâches sont d\'importance égales'),
                value: 'equal',
                groupValue: _priority2,
                onChanged: (String? value) {
                  setState(() {
                    _priority2 = value;
                    iu=1;
                  });
                },
              ),
            ],
          ),
          _buildPageContent(
            title: 'Ensuite ...',
            question:
                "Si vous avez deux tâches dont l'une est importante et l'autre se déroule à une heure spécifique, dans quel ordre souhaiteriez-vous que l\'on vous rappelle la tâche?",
            options: [
              RadioListTile<String>(
                title: const Text('La tâche importante est prioritaire'),
                value: 'important',
                groupValue: _priority4,
                onChanged: (String? value) {
                  setState(() {
                    _priority4 = value;
                    _subPriority4 = null;
                  });
                },
              ),
              if (_priority4 == 'important') ...[
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: Text(
                      "A quel fréquence noteriez-vous l\'importance d\'une tâche par rapport à l'heure de la tache ?"),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Importance moderée'),
                    value: 'important_1',
                    groupValue: _subPriority4,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority4 = value;
                        ih=3;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Très importante'),
                    value: 'important_2',
                    groupValue: _subPriority4,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority4 = value;
                        ih=5;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Vraiment très importante'),
                    value: 'important_3',
                    groupValue: _subPriority4,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority4 = value;
                        ih=7;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Extrêmement importante'),
                    value: 'important_4',
                    groupValue: _subPriority4,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority4 = value;
                        ih=9;
                      });
                    },
                  ),
                ),
              ],
              RadioListTile<String>(
                title: const Text(
                    'L\'heure d\'exécution de la tâche doit être prioritaire'),
                value: 'time',
                groupValue: _priority4,
                onChanged: (String? value) {
                  setState(() {
                    _priority4 = value;
                  });
                },
              ),
              if (_priority4 == 'time') ...[
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: Text(
                      "A quelle fréquence noteriez-vous l'heure d'une tache par rapport à son importance?"),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Importance moderée'),
                    value: 'important_1',
                    groupValue: _subPriority4,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority4 = value;
                        ih=3;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Très importante'),
                    value: 'important_2',
                    groupValue: _subPriority4,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority4 = value;
                        ih=5;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Vraiment très importante'),
                    value: 'important_3',
                    groupValue: _subPriority4,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority4 = value;
                        ih=7;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Extrêmement importante'),
                    value: 'important_4',
                    groupValue: _subPriority4,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority4 = value;
                        ih=9;
                      });
                    },
                  ),
                ),
              ],
              RadioListTile<String>(
                title: const Text('Les deux tâches sont d\'importance égales'),
                value: 'equal',
                groupValue: _priority4,
                onChanged: (String? value) {
                  setState(() {
                    _priority4 = value;
                  });
                },
              ),
            ],
          ),
          _buildPageContent(
            title: 'Ensuite ...',
            question:
                'Si vous avez deux tâches ayant la même durée, se déroulant le même jour dont l\'une est marquée urgente et l\'autre est une simple tâche qui s\'exécutera à une heure spécifique, dans quel ordre souhaiteriez-vous que l\'on vous rappelle la tâche?',
            options: [
              RadioListTile<String>(
                title: const Text('La tâche importante est prioritaire'),
                value: 'important',
                groupValue: _priority5,
                onChanged: (String? value) {
                  setState(() {
                    _priority5 = value;
                    _subPriority5 = null;
                  });
                },
              ),
              if (_priority5 == 'important') ...[
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: Text(
                      'A quel fréquence noteriez-vous l\'urgence d\'une tâche par rapport à la l\'heure ?'),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Importance moderée'),
                    value: 'important_1',
                    groupValue: _subPriority5,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority5 = value;
                        uh=3;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Très importante'),
                    value: 'important_2',
                    groupValue: _subPriority5,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority5 = value;
                        uh=5;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Vraiment très importante'),
                    value: 'important_3',
                    groupValue: _subPriority5,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority5 = value;
                        uh=7;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Extrêmement importante'),
                    value: 'important_4',
                    groupValue: _subPriority5,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority5 = value;
                        uh=9;
                      });
                    },
                  ),
                ),
              ],
              RadioListTile<String>(
                title: const Text(
                    'L\'heure d\'exécution de la tâche doit être prioritaire'),
                value: 'time',
                groupValue: _priority5,
                onChanged: (String? value) {
                  setState(() {
                    _priority5 = value;
                  });
                },
              ),
              if (_priority5 == 'time') ...[
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: Text(
                      "A quelle fréquence noteriez-vous l\'heure de la tache par rapport à l'urgence ?"),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Importance moderée'),
                    value: 'important_1',
                    groupValue: _subPriority5,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority5 = value;
                        uh=3;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Très importante'),
                    value: 'important_2',
                    groupValue: _subPriority5,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority5 = value;
                        uh=5;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Vraiment très importante'),
                    value: 'important_3',
                    groupValue: _subPriority5,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority5 = value;
                        uh=7;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Extrêmement importante'),
                    value: 'important_4',
                    groupValue: _subPriority5,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority5 = value;
                        uh=9;
                      });
                    },
                  ),
                ),
              ],
              RadioListTile<String>(
                title: const Text('Les deux tâches sont d\'importance égales'),
                value: 'equal',
                groupValue: _priority5,
                onChanged: (String? value) {
                  setState(() {
                    _priority5 = value;
                    uh=1;
                  });
                },
              ),
            ],
          ),
          _buildPageContent(
            title: 'Ensuite ...',
            question:
                'Si vous avez deux tâches se déroulant le même jour dont l\'une est marquée urgente et l\'autre est une simple tâche qui s\'exécutera pendant une durée specifique, dans quel ordre souhaiteriez-vous que l\'on vous rappelle la tâche?',
            options: [
              RadioListTile<String>(
                title: const Text('La tâche urgente est prioritaire'),
                value: 'important',
                groupValue: _priority6,
                onChanged: (String? value) {
                  setState(() {
                    _priority6 = value;
                    _subPriority6 = null;
                  });
                },
              ),
              if (_priority6 == 'important') ...[
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: Text(
                      'A quel fréquence noteriez-vous l\'urgence d\'une tâche par rapport à la durée ?'),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Importance moderée'),
                    value: 'important_1',
                    groupValue: _subPriority6,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority6 = value;
                        ud=3;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Très importante'),
                    value: 'important_2',
                    groupValue: _subPriority6,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority6 = value;
                        ud=5;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Vraiment très importante'),
                    value: 'important_3',
                    groupValue: _subPriority6,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority6 = value;
                        ud=7;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Extrêmement importante'),
                    value: 'important_4',
                    groupValue: _subPriority6,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority6 = value;
                        ud=9;
                      });
                    },
                  ),
                ),
              ],
              RadioListTile<String>(
                title: const Text('La durée de la tâche doit être prioritaire'),
                value: 'time',
                groupValue: _priority6,
                onChanged: (String? value) {
                  setState(() {
                    _priority6 = value;
                  });
                },
              ),
              if (_priority6 == 'time') ...[
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: Text(
                      "A quelle fréquence noteriez-vous la durée d'une tache par rapport à l'urgence?"),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Importance moderée'),
                    value: 'important_1',
                    groupValue: _subPriority6,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority6 = value;
                        ud=3;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Très importante'),
                    value: 'important_2',
                    groupValue: _subPriority6,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority6 = value;
                        ud=5;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Vraiment très importante'),
                    value: 'important_3',
                    groupValue: _subPriority6,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority6 = value;
                        ud=7;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Extrêmement importante'),
                    value: 'important_4',
                    groupValue: _subPriority6,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority6 = value;
                        ud=9;
                      });
                    },
                  ),
                ),
              ],
              RadioListTile<String>(
                title: const Text('Les deux tâches sont d\'importance égales'),
                value: 'equal',
                groupValue: _priority6,
                onChanged: (String? value) {
                  setState(() {
                    _priority6 = value;
                    ud=1;
                  });
                },
              ),
            ],
          ),
          _buildPageContent(
            title: 'Enfin ...',
            question:
                'Si vous avez deux tâches dont l\'une a une durée limité et l\'autre doit s\'effectuer en respectant une heure spécifique dans quel ordre souhaiteriez-vous que l\'on vous rappelle la tâche?',
            options: [
              RadioListTile<String>(
                title: const Text('La tâche de durée limitée est prioritaire'),
                value: 'limited',
                groupValue: _priority3,
                onChanged: (String? value) {
                  setState(() {
                    _priority3 = value;
                    _subPriority3 = null;
                  });
                },
              ),
              if (_priority3 == 'limited') ...[
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Importante'),
                    value: 'limited_1',
                    groupValue: _subPriority3,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority3 = value;
                        dh=3;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Très importante'),
                    value: 'limited_2',
                    groupValue: _subPriority3,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority3 = value;
                       dh=5;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Vraiment très importante'),
                    value: 'limited_3',
                    groupValue: _subPriority3,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority3 = value;
                       dh=7;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Extrêmement importante'),
                    value: 'limited_4',
                    groupValue: _subPriority3,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority3 = value;
                        dh=9;
                      });
                    },
                  ),
                ),
              ],
              RadioListTile<String>(
                title: const Text(
                    'L\'heure d\'exécution de la tâche doit être prioritaire'),
                value: 'time',
                groupValue: _priority3,
                onChanged: (String? value) {
                  setState(() {
                    _priority3 = value;
                   
                  });
                },
              ),
              if (_priority3 == 'time') ...[
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: Text(
                      "A quelle fréquence noteriez-vous l\'heure de la tache par rapport à la durée ?"),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Importance moderée'),
                    value: 'important_1',
                    groupValue: _subPriority3,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority3 = value;
                         dh=3;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Très importante'),
                    value: 'important_2',
                    groupValue: _subPriority3,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority3 = value;
                        dh=5;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Vraiment très importante'),
                    value: 'important_3',
                    groupValue: _subPriority3,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority3 = value;
                        dh=7;
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 32.0),
                  child: RadioListTile<String>(
                    title: const Text('Extrêmement importante'),
                    value: 'important_4',
                    groupValue: _subPriority3,
                    onChanged: (String? value) {
                      setState(() {
                        _subPriority3 = value;
                        dh=9;
                      });
                    },
                  ),
                ),
              ],
              RadioListTile<String>(
                title: const Text('Les deux tâches sont d\'importance égales'),
                value: 'equal',
                groupValue: _priority3,
                onChanged: (String? value) {
                  setState(() {
                    _priority3 = value;
                    dh=1;
                  });
                },
              ),
            ],
          ),
          _buildPageContent(
            title: "Merci pour votre contribution vos préférences seront prises en compte 😊🥰",
            question: "",
            options: [],
          ),
        ],
      ),
    );
  }
}
