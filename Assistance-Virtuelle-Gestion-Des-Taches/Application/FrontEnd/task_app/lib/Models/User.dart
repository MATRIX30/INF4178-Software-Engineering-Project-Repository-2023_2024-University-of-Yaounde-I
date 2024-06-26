class User {
  int id;
  String email;
  String firstName;
  String lastName;
  String phoneNumber;
  String password;
  String? photo;
  String? voice;

  static User? instance;

  User({
    required this.id,
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.phoneNumber,
    required this.password,
    this.photo,
    this.voice,
  });

  static User getinstance() {
    return instance!;
  }

  factory User.fromjson(Map<String, dynamic> json) {
    return User(
        id: json['idCompte'],
        email: json['mail'].toString(),
        firstName: json['nom'].toString(),
        lastName: json['prenom'].toString(),
        phoneNumber: json['phone']!=null?json['phone'].toString():"----",
        password: json['password']!=null?json['password'].toString():"----");
  }
}
