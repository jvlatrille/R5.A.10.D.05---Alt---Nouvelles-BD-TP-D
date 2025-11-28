use("nodenot_bd1") ;

db.Articles.find(
    { "Tva.LibelleTVA": "Majoré" }, // Filtre
    { Descriptif: 1, _id: 0 }       // Projection
);