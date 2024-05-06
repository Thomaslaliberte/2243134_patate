const Users = require("../models/user.model.js");
const bcrypt = require('bcrypt');

exports.ajouterUnUser = (req, res) => {
    // Teste si le paramètre id est présent et valide
    var message = [];
    if (!req.body.nom) {
        message.push("nom");
    }
    if (!req.body.prenom) {
        message.push("prenom");
    }
    if (!req.body.courriel) {
        message.push("courriel");
    }
    if (!req.body.mot_de_passe) {
        message.push("mot_de_passe");
    }
    
    if (message[0] != null) {
        res.status(400);
        res.send({
            erreur: "champs manquant",
            champ_manquant: message
        });
        return;
    }

    Users.verifierUnUser(req)
        // Si c'est un succès
        .then((user) => {
            if (user[0] == null) {
                Users.ajouterUnUser(req)
                    // Si c'est un succès
                    .then((Nuser) => {

                        res.send({ message: "L'utilisateur " + [req.body.prenom]+" " +[req.body.nom] + " a été ajouté avec succès", "cle_api": Nuser })
                    })
                    .catch((erreur) => {
                        console.log('Erreur : ', erreur);
                        res.status(500)
                        res.send({
                            message: "echec lors de la creation de " + [req.body.prenom]+" " +[req.body.nom]
                        });
                    });
            }
            else {
                res.status(400)
                res.send({
                    message: "le courriel est deja utilisé"
                });
            }

        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "echec lors de la vérification du courriel"
            });
        });



};

exports.nouvelleCle = (req, res) => {
    var message = [];
    if (!req.body.courriel) {
        message.push("courriel");
    }
    if (!req.body.mot_de_passe) {
        message.push("mot_de_passe");
    }
    if (message[0] != null) {
        res.status(400);
        res.send({
            erreur: "champs manquant",
            champ_manquant: message
        });
        return;
    }
    Users.verifierCombinaison(req)
        .then((user) => {
            if (user[0] != null) {
                bcrypt.compare(req.body.mot_de_passe, user[0].password)
                    .then(resultat => {
                        if(resultat){
                            Users.creationCle(req)
                            .then((cle) => {
                                res.send({ "cle_api": cle })
                            })
                            .catch(err => {
                                res.status(500)
                                res.send({
                                    message: "echec lors de la creation de la cle"
                                });
                            });
                        }
                        else{
                            res.status(400)
                            res.send({
                                message: "la combinaison n'existe pas"
                            });
                        }

                    })
                    .catch(err => {
                        res.status(500)
                        res.send({
                            message: "échec lors de la creation de la cle"
                        });
                    })
            }
            else {
                res.status(500)
                res.send({
                    message: "echec de vérification de la combinaison"
                });
            }
        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "echec lors de la vérification du compte"
            });
        });

}