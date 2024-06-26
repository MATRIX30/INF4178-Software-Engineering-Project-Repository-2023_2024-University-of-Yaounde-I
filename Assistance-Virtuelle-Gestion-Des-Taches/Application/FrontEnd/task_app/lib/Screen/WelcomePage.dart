import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:task_app/Screen/register.dart';

class WelcomePage extends StatefulWidget {
  const WelcomePage({super.key});

  @override
  _WelcomePageState createState() => _WelcomePageState();
}

class _WelcomePageState extends State<WelcomePage> {
  final List<String> imgList = [
    'assets/images/profill.png',
    'assets/images/imgTask1.jpg',
    'assets/images/imgTask2.jpg'
  ];

  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 60.0),
                child: CarouselSlider(
                  options: CarouselOptions(
                    height: 200.0,
                    autoPlay: true,
                    enlargeCenterPage: true,
                    aspectRatio: 16 / 9,
                    autoPlayCurve: Curves.fastOutSlowIn,
                    enableInfiniteScroll: true,
                    autoPlayAnimationDuration: Duration(milliseconds: 800),
                    viewportFraction: 1.0,
                    onPageChanged: (index, reason) {
                      setState(() {
                        _currentIndex = index;
                      });
                    },
                  ),
                  items: imgList
                      .map((item) => ClipRRect(
                            borderRadius: BorderRadius.circular(10.0),
                            child: Container(
                              height: 200.0,
                              child: Image.asset(item,
                                  fit: BoxFit.cover, width: 200),
                            ),
                          ))
                      .toList(),
                ),
              ),
              Container(
                margin:
                    EdgeInsets.only(top: 50.0), // Ajout de la marge supérieure
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: imgList.map((url) {
                    int index = imgList.indexOf(url);
                    return Container(
                      width: 12.0,
                      height: 12.0,
                      margin:
                          EdgeInsets.symmetric(vertical: 10.0, horizontal: 8.0),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: _currentIndex == index
                            ? Color.fromARGB(255, 19, 130, 204)
                            : Color.fromRGBO(0, 0, 0, 0.4),
                      ),
                    );
                  }).toList(),
                ),
              ),
              const SizedBox(height: 20),
              const Text(
                'Manage your Tasks',
                style: TextStyle(fontSize: 24),
              ),
              const SizedBox(height: 20),
              Container(
                margin: EdgeInsets.only(left: 10,right: 10),
                child: const Text(
                  'Increase your productivity by managing your personal and team tasks',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 16,
                    color: Color.fromARGB(255, 97, 97, 97),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 50.0),
                child: Container(
                  margin: const EdgeInsets.only(top: 25.0),
                  child: ElevatedButton(
                    onPressed: () {
                       Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => RegisterPage()));
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Color.fromARGB(255, 3, 161, 195),
                      padding: const EdgeInsets.symmetric(
                          vertical: 25, horizontal: 80),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(
                            15.0), // Ajout du BorderRadius
                      ),
                      elevation: 5, // Ajout du boxShadow
                      shadowColor: Colors.grey.withOpacity(0.8),
                    ),
                    child: const Text(
                      "Let's start",
                      style: TextStyle(
                        fontSize: 22,
                      ),
                    ),
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
