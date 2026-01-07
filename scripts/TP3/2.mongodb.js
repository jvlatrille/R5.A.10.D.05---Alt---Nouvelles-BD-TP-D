use("nodenot_bd1");

db.Articles.aggregate([
  {
    // Équivalent SQL : WHERE Tva.TauxTva > 0.05
    // On filtre d'abord les documents, c'est plus performant de le faire avant le groupement.
    $match: {
      "Tva.TauxTVA": { $gt: 0.05 }
    }
  },
  {
    // Équivalent SQL : GROUP BY TVA.LibelleTVA
    $group: {
      _id: "$Tva.LibelleTVA",  // La clé de groupement
      
      // Équivalent SQL : Count(Article.Reference)
      nombre: { $sum: 1 } 
    }
  },
  {
    // Équivalent SQL : ORDER BY Count(...) desc
    $sort: {
      nombre: -1
    }
  }
]);