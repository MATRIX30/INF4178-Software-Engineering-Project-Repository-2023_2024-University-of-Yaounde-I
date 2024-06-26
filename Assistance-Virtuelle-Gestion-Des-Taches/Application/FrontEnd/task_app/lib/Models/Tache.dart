class Tache {
  int id;
  String nom;
  String description;
  String dateDebut;
  String heureDebut;
  String dateFin;
  String heureFin;
  int importante;
  String etat;
  bool selected;
  int urgente;
  

  Tache(
      {required this.id,
      required this.nom,
      required this.description,
      required this.dateDebut,
      required this.heureDebut,
      required this.dateFin,
      required this.heureFin,
      required this.importante,
      required this.etat,
      required this.selected,
      required this.urgente});

  factory Tache.fromJson(Map<String, dynamic> json) {
    return Tache(
        id: json['idTache'] as int,
        nom: json['name'].toString(),
        description: json['description'].toString(),
        dateDebut: json['dateDebut'].toString(),
        dateFin: json['dateEcheance'].toString(),
        heureDebut: json['heureDebut'].toString(),
        heureFin: json['heureFin'].toString(),
        etat: json['statut'].toString(),
        importante: json["prioritaire"] as int,
        urgente: json['urgente'] as int,
        selected: false);
  }
}
