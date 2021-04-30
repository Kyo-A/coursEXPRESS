// Importation du module installe
var mysql2 = require('mysql2');

// Preparation de la connexion
var db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'formation_db'
});

// Etablissement de la connexion (Erreur de connexion catchée)
db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('Connected to db');
});

// Mise en place de la variable globale (dans toute l'app) db
// Nous voulons utiliser la meme instance de connexion dans les differents modules de l'application
global.db = db;

module.exports = db;



