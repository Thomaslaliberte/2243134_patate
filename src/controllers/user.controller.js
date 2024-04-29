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

    // Appel à la fonction trouverUnProfesseur dans le modèle
    Users.verifierUnUser(req)
        // Si c'est un succès
        .then((user) => {
            if (user[0] == null) {
                Users.ajouterUnUser(req)
                    // Si c'est un succès
                    .then((Nuser) => {

                        // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
                        res.send({ message: "L'utilisateur " + [req.body.prenom]+" " +[req.body.nom] + " a été ajouté avec succès", "cle_api": Nuser })
                    })
                    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
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
        // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
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
                            Users.creationCle(req)
                            .then((cle) => {
                                res.send({ "cle_api ": cle })
                            })
                            .catch(err => {
                                res.status(500)
                                res.send({
                                    message: "echec lors de la creation de la cle"
                                });
                            });
                        

                    })
                    .catch(err => {
                        res.status(400)
                        res.send({
                            message: "la combinaison n'existe pas"
                        });
                    })
            }
            else {
                res.status(400)
                res.send({
                    message: "la combinaison n'existe pas"
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