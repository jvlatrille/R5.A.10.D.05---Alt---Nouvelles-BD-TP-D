use("nodenot_bd1") ;

db.Commandes.find({
    $where: "this.DateCommande.getMonth() == 8 && this.DateCommande.getDay() == 1"
});