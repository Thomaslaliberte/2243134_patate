const express = require('express');
// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router(); 
const tacheControlleur = require('../../controllers/taches.controller');


router.post('/liste', (req, res) => {
    tacheControlleur.trouverLesTaches(req, res)
});

router.post('/', (req, res) => {
    tacheControlleur.creerUneTache(req, res);
});
router.get('/:id', (req, res) => {
    tacheControlleur.trouverUneTache(req, res);
});
router.put('/:id', (req, res) => {
    tacheControlleur.modifierUneTache(req, res);
});
router.put('/status/:id', (req, res) => {
    tacheControlleur.modifierStatusTache(req, res);
});
router.delete('/:id', (req, res) => {
    tacheControlleur.supprimerUneTache(req, res);
});


module.exports = router;