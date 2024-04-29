const Taches = require("../models/taches.model.js");
const SousTaches = require("../models/sousTaches.model.js");
const { description, date_debut, date_echeance, complete } = require("../models/sousTaches.model.js");

exports.creerUneSousTache = (req, res) => {
    var message = "";
    if (!req.body.tache_id) {
        message += "tache_id\r\n";
    }
    if (!req.body.titre) {
        message += "titre\r\n";
    }
    if (req.body.complete == null) {
        message += "complete\r\n";
    }

    if (message != "") {
        res.status(400);
        res.send({
            champ_manquant: message
        });
        return;
    };
    Taches.verifierUneTache(req.body.tache_id)
        .then((valeur) => {
            if (valeur != "") {
                Taches.verifierCle(req.headers.authorization.split(' ')[1], req.body.tache_id)
                    .then((cle) => {
                        if (cle != "") {
                            SousTaches.creerUneSousTache(req)

                                // Si c'est un succès
                                .then((tache) => {
                                    res.send({ message: "la sous-tache " + req.body.titre + " à été ajouter avec succès" });
                                })
                                // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
                                .catch((erreur) => {
                                    console.log('Erreur : ', erreur);

                                    res.status(500)
                                    res.send({
                                        message: "Erreur lors de la creation de la sous-tache"
                                    });
                                });
                        }
                        else {
                            res.status(403)
                            res.send({
                                message: "La tache ne vien pas de cet utilisateur"
                            });
                        }
                    })
                    .catch((erreur) => {
                        console.log('Erreur : ', erreur);
                        res.status(500)
                        res.send({
                            message: "echec lors de la verification de la cle d'api "
                        });
                    });
            }
            else {
                res.status(404)
                res.send({
                    message: "la tache " + [req.body.tache_id] + " n'existe pas"
                });
            }


        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "echec lors de la verification de la tache " + [req.params.id]
            });
        });

};


exports.modifierUneSousTache = (req, res) => {
    // Teste si le paramètre id est présent et valide
    var message = "";
    if (!req.body.titre) {
        message += "titre\r\n";
    }
    if (req.body.complete == null) {
        message += "complete\r\n";
    }
    if (!req.params.id) {
        message += "id\r\n";
    }
    if (message != "") {
        res.status(400);
        res.send({
            champ_manquant: message
        });
        return;
    }
    SousTaches.verifierUneSousTache(req)
        .then((valeur) => {
            if (valeur != "") {
                Taches.verifierCle(req.headers.authorization.split(' ')[1], req.params.id)
                    .then((cle) => {
                        if (cle != "") {
                            SousTaches.modifierUneSousTache(req)
                                // Si c'est un succès
                                .then((tache) => {

                                    res.send({ message: "La sous-tache " + [req.params.id] + " a été modifier avec succès", sousTache: { id: req.params.id, titre: req.body.titre, complete: req.body.complete } })
                                })
                                // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
                                .catch((erreur) => {
                                    console.log('Erreur : ', erreur);
                                    res.status(500)
                                    res.send({
                                        message: "echec lors de la modification de la sous-tache " + [req.params.id]
                                    });
                                });
                        }
                        else {
                            res.status(403)
                            res.send({
                                message: "La tache ne vien pas de cet utilisateur"
                            });
                        }
                    })
                    .catch((erreur) => {
                        console.log('Erreur : ', erreur);
                        res.status(500)
                        res.send({
                            message: "echec lors de la verification de la cle d'api "
                        });
                    });
            }
            else {
                res.status(404)
                res.send({
                    message: "la sous-tache " + [req.params.id] + " n'existe pas"
                });
            }


        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "echec lors de la verification de la sous-tache " + [req.params.id]
            });
        });
};

exports.modifierStatusSousTache = (req, res) => {
    // Teste si le paramètre id est présent et valide
    var message = "";
    if (req.body.complete == null) {
        message += "complete\r\n";
    }
    if (!req.params.id) {
        message += "id\r\n";
    }
    if (message != "") {
        res.status(400);
        res.send({
            champ_manquant: message
        });
        return;
    }
    SousTaches.verifierUneSousTache(req)
        .then((valeur) => {
            if (valeur != "") {
                Taches.verifierCle(req.headers.authorization.split(' ')[1], req.params.id)
                    .then((cle) => {
                        if (cle != "") {
                            SousTaches.modifierStatusSousTache(req)
                                // Si c'est un succès
                                .then((tache) => {

                                    res.send({ message: "La sous-tache " + [req.params.id] + " a été modifier avec succès", sousTache: { id: req.params.id, complete: req.body.complete } })
                                })
                                // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
                                .catch((erreur) => {
                                    console.log('Erreur : ', erreur);
                                    res.status(500)
                                    res.send({
                                        message: "echec lors de la modification de la sous-tache " + [req.params.id]
                                    });
                                });
                        }
                        else {
                            res.status(403)
                            res.send({
                                message: "La tache ne vien pas de cet utilisateur"
                            });
                        }
                    })
                    .catch((erreur) => {
                        console.log('Erreur : ', erreur);
                        res.status(500)
                        res.send({
                            message: "echec lors de la verification de la cle d'api "
                        });
                    });
            }
            else {
                res.status(404)
                res.send({
                    message: "la sous-tache " + [req.params.id] + " n'existe pas"
                });
            }


        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "echec lors de la verification de la sous-tache " + [req.params.id]
            });
        });
};


exports.supprimerUneSousTache = (req, res) => {
    // Teste si le paramètre id est présent et valide

    SousTaches.verifierUneSousTache(req)
        .then((valeur) => {
            if (valeur[0]) {
                Taches.verifierCle(req.headers.authorization.split(' ')[1], req.params.id)
                    .then((cle) => {
                        if (cle != "") {
                            SousTaches.supprimerUneSousTache(req)
                                // Si c'est un succès
                                .then((tache) => {

                                    res.send({ message: "La sous-tache " + [req.params.id] + " a été supprimer avec succès", sousTache: { id: req.params.id, tache: tache } })
                                })
                                // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
                                .catch((erreur) => {
                                    console.log('Erreur : ', erreur);
                                    res.status(500)
                                    res.send({
                                        message: "echec lors de la suppression de la sous-taches "
                                    });
                                });
                        }
                        else {
                            res.status(403)
                            res.send({
                                message: "La tache ne vien pas de cet utilisateur"
                            });
                        }
                    })
                    .catch((erreur) => {
                        console.log('Erreur : ', erreur);
                        res.status(500)
                        res.send({
                            message: "echec lors de la verification de la cle d'api "
                        });
                    });
            }
            else {
                res.status(404)
                res.send({
                    message: "la sous-tache " + [req.params.id] + " n'existe pas"
                });
            }


        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "echec lors de la verification de la sous-tache " + [req.params.id]
            });
        });
}; 