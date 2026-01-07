use("nodenot_bd1");

db.Commandes.aggregate([
  {
    $project: {
      Numero: 1,
      nbLignes: { $size: "$LignesDeCommande" }
    }
  }
]);