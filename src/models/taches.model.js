const sql = require("../config/pg_db.js");


const Taches = (tache) => {
    this.utilisateur_id = tache.utilisateur_id;
    this.titre = tache.titre;
    this.description = tache.description;
    this.date_debut = tache.date_debut;
    this.date_echeance = tache.date_echeance;
    this.complete = tache.complete;
};

Taches.chercherUtilisateur = (cle) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT id FROM utilisateur WHERE cle_api = $1`;
        const params = [cle];

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.creerUneTache = (req, id) => {
    return new Promise((resolve, reject) => {

        const requete = `INSERT INTO taches (utilisateur_id, titre, description, date_debut, date_echeance, complete) VALUES ($1, $2, $3, $4, $5, $6)`;
        const params = [id, req.body.titre, req.body.description, req.body.date_debut, req.body.date_echeance, req.body.complete];
        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.trouverUneTache = (id) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT titre, description, date_debut, date_echeance, complete FROM taches WHERE id = $1`;
        const params = [id];

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.trouverLesTaches = (id) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT id, titre, description, date_debut, date_echeance, complete FROM taches WHERE utilisateur_id = $1 AND complete = $2`;
        const params = [id, false];

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.verifierCle = (cle, id) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT cle_api FROM taches INNER JOIN utilisateur on utilisateur_id = utilisateur.id WHERE cle_api = $1 and taches.id = $2`;
        const params = [cle,id];

        sql.query(requete, params, (erreur, resultat) => {

            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.trouverToutesLesTaches = (id) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT titre, description, date_debut, date_echeance, complete FROM taches WHERE utilisateur_id = $1`;
        const params = [id];

        sql.query(requete, params, (erreur, resultat) => {

            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.modifierUneTache = (req) => {
    return new Promise((resolve, reject) => {
        let requete = `update taches set titre = $1, description = $2, date_debut = $3, date_echeance = $4, complete = $5 where id = $6`;
        let params = [req.body.titre, req.body.description, req.body.date_debut, req.body.date_echeance, req.body.complete, req.params.id]
        

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.modifierStatusTache = (req) => {
    return new Promise((resolve, reject) => {
        let requete = `update taches set complete = $1 where id = $2`;
        let params = [req.body.complete, req.params.id]
        

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.verifierUneTache = (id) => {
    return new Promise((resolve, reject) => {
        let requete = `SELECT id FROM taches WHERE id = $1`;
        let params = [id]
        
        

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Taches.supprimerUneTache = (req) => {
    return new Promise((resolve, reject) => {
        
            let requete = `DELETE FROM taches where id = $1`;
            let params = [req.params.id]
        
        

            sql.query(requete, params, (erreur, resultat) => {
                if (erreur) {
                    // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
                }

                // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
                resolve(resultat.rows);
            });
    });
};


module.exports = Taches;