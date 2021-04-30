var express = require('express');
// La fonction Router() permet de définir des routes dans 
// une application Express -
var router = express.Router();
var personController = require('../controllers/person.controller')

// router.get('/add', function(req, res) {
//     res.send('Ajout personne');
// });

// router.get('/edit', function(req, res) {
//     res.send('Edit personne');
// });

// router.get('/search', function(req, res) {
//     res.send('Search personne');
// });

// ex : http://localhost:8080/person/show
router.get('/show', personController.show);

// ex : http://localhost:8080/person/1
router.get('/getOne/:id', personController.findById);

// ex : http://localhost:8080/person/save
router.post('/save', personController.save);

// ex : http://localhost:8080/person/1
router.get('/delete/:id', personController.delete);

// ex : http://localhost:8080/person/1
router.put('/update/:id', personController.update);

module.exports = router;