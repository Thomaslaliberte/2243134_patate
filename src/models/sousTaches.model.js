const sql = require("../config/pg_db.js");


const SousTaches = (sousTache) => {
    this.tache_id = sousTache.tache_id;
    this.titre = tache.titre;
    this.complete = tache.complete;
};

SousTaches.creerUneSousTache = (req) => {
    return new Promise((resolve, reject) => {

        const requete = `INSERT INTO sous_taches (tache_id, titre, complete) VALUES ($1, $2, $3)`;
        const params = [req.body.tache_id, req.body.titre, req.body.complete];

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

SousTaches.modifierUneSousTache = (req) => {
    return new Promise((resolve, reject) => {
        let requete = `update sous_taches set titre = $1, complete = $2 where id = $3`;
        let params = [req.body.titre, req.body.complete, req.params.id]
        
        

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

SousTaches.modifierStatusSousTache = (req) => {
    return new Promise((resolve, reject) => {
        let requete = `update sous_taches set complete = $1 where id = $2`;
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

SousTaches.verifierUneSousTache = (req) => {
    return new Promise((resolve, reject) => {
        let requete = `SELECT id FROM sous_taches WHERE id = $1`;
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

SousTaches.supprimerUneSousTache = (req) => {
    return new Promise((resolve, reject) => {
        
            let requete = `DELETE FROM sous_taches where id = $1`;
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

SousTaches.supprimerUneSousTacheDeTaches = (req) => {
    return new Promise((resolve, reject) => {
        
            let requete = `DELETE FROM sous_taches where tache_id = $1`;
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

SousTaches.trouverToutesLesSousTaches = (tache_id) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT * FROM sous_taches WHERE tache_id = $1`;
        const params = [tache_id];

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

module.exports = SousTaches;