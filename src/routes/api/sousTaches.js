const express = require('express');
// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router(); 
const sousTacheController = require('../../controllers/sousTaches.controller');


router.get('/liste', (req, res) => {
    sousTacheController.trouverLesSousTaches(req, res)
});

router.post('/', (req, res) => {
    sousTacheController.creerUneSousTache(req, res);
});
router.get('/:id', (req, res) => {
    sousTacheController.trouverUneSousTache(req, res);
});
router.put('/:id', (req, res) => {
    sousTacheController.modifierUneSousTache(req, res);
});
router.put('/status/:id', (req, res) => {
    sousTacheController.modifierStatusSousTache(req, res);
});
router.delete('/:id', (req, res) => {
    sousTacheController.supprimerUneSousTache(req, res);
});


module.exports = router;