use("nodenot_bd1");

db.Commandes.aggregate([
  {
    $project: {
      nbLignes: { $size: "$LignesDeCommande" }
    }
  }
]);
