const express = require('express');
// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router(); 
const ajouterUser = require('../../controllers/user.controller');

router.post('/', (req, res) => {
    ajouterUser.ajouterUnUser(req, res);
});
router.post('/cle', (req, res) => {
    ajouterUser.nouvelleCle(req, res);
});

module.exports = router;