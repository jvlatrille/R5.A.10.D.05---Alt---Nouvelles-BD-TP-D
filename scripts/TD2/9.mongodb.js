use("nodenot_bd1") ;

let longueurDescriptif = { $strLenCP: "$Descriptif" };

db.getCollection("Articles").find(
    { $expr: { $gt: [longueurDescriptif, 40] } },
    { Descriptif: 1, "taille": longueurDescriptif, _id: 0 }
);