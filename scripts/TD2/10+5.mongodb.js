use("nodenot_bd1");

// On veut afficher les articles les plus chers, mais en ignorant le tout premier (le plus cher de tous).

db.Articles.find({}, { Descriptif: 1, PrixHT: 1, _id: 0 }) // Projection
   .sort({ PrixHT: -1 }) // Tri décroissant (du plus cher au moins cher)
   .skip(1)              // On saute le premier
   .limit(3)             // On en prend 3