class Notifications {
  int id;
  String message;
  String titre;
  bool dejalu;
  String date;

  Notifications(
      {required this.id,
      required this.message,
      required this.titre,
      required this.dejalu,
      required this.date});

  factory Notifications.fromJson(Map<String, dynamic> json) {
    return Notifications(
        id: json['id'],
        message: json['message'].toString(),
        titre: json['titre'].toString(),
        dejalu: json['lu'] as bool,
        date: json['dateTime'].toString());
  }
}
