import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:task_app/Utils/Themes.dart';



class PickImage extends StatefulWidget {
  
  const PickImage({super.key});

  @override
  State<PickImage> createState() => _PickImageState();
}

class _PickImageState extends State<PickImage> {





    // ignore: avoid_init_to_null
  File? photoProfile = null;
  File? photoProfileFinale = null;

  Future<File?> _getImageFromGallery()async{
    final image = await ImagePicker().pickImage(source: ImageSource.gallery);

    if(image==null) return null;

    File imageFile = File(image.path);
    return imageFile;
  }

  @override
  Widget build(BuildContext context) {
     return AlertDialog(
            title: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                IconButton(
                  onPressed: () => Navigator.of(context).pop(),
                  icon: const Icon(
                    Icons.close,
                    color: Color.fromARGB(255, 3, 161, 195),
                  ),
                ),
              ],
            ),
            content: SizedBox(
              height: 240,
              width: 200,
              child: Column(
                children: [
                  Center(
                    child: Column(
                      children: [
                        GestureDetector(
                            onTap: () async {
                              photoProfile=await _getImageFromGallery();
                              setState(() {
                                photoProfileFinale=photoProfile;
                              });
                              
                            },
                            child: Container(
                                width: 130,
                                height: 130,
                                decoration: BoxDecoration(
                                  image: photoProfileFinale!=null?DecorationImage(image: FileImage(photoProfileFinale!),fit: BoxFit.cover):null,
                                  border:
                                      Border.all(width: 1, color: Colors.white),
                                  boxShadow: [
                                    BoxShadow(
                                        spreadRadius: 2,
                                        blurRadius: 10,
                                        color: Colors.black.withOpacity(0.1))
                                  ],
                                  shape: BoxShape.circle,
                                ),
                                child:photoProfileFinale==null? Image.asset(
                                  'assets/images/image.png',
                                  width: 20,
                                ):Text(""))),
                        const SizedBox(
                          height: 30,
                        ),
                        SizedBox(
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: FIRST_THEME_COLOR,
                              shadowColor: FIRST_THEME_COLOR,
                              elevation: 8,

                              shape: RoundedRectangleBorder(
                                borderRadius:
                                    BorderRadius.circular(10), // Moins arrondi
                              ),
                              foregroundColor:
                                  Colors.white, // Texte du bouton en blanc
                            ),
                            onPressed: () {
                              if(photoProfileFinale!=null){
                                Navigator.pop(context,photoProfileFinale);
                              }else{
                                Navigator.pop(context,false);
                              }
                              
                            },
                            child: const Text('Enregistrer'),
                          ),
                        )
                      ],
                    ),
                  ),
                ],
              ),
            ));
  }
}