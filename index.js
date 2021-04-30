// Express.js est un framework pour construire des applications web basées sur Node.js. 
// C'est de fait le framework standard pour le développement de serveur (Back-end) en Node.js.
var express = require('express');
var person = require('./routes/person.route');
const handleErrors = require('./middlewares/handleErrors');
var cors = require('cors');
var app = express();

// Dans notre application, nous respectons le design pattern MVC (MODEL-VIEW-CONTROLLER) 
// voici la description des modules
// - module db.js = connexion db mysql
// - person.model.js = represente le DAO (DATA ACCESS OBJECT), appel du module db.js pr la co db
// - person.controller.js = represente la classe recevant les requetes et renvoyant donc reponses, pour que ca
// marche nous appellerons le module person.model.js
// - person.router.js = represente la classe de routing attribuant des chemins aux méthodes déclarées et initilisées
// dans person.controller.js
// - Mise en place d'un middleware HandleErrors de traitement d'erreurs (appel de la classe ../utils/errors.js)
// et declaration du middleware dans index.js

// CORS est un raccourci pour le partage de ressources inter-origines. 
// Il s'agit d'un mécanisme permettant d'autoriser ou de restreindre les 
// ressources demandées sur un serveur Web en fonction de l'endroit où la 
// requête HTTP a été lancée. 
app.use(cors());

app.use(express.json());
// accessible via req.body
app.use(express.urlencoded());

app.use(handleErrors);

// Un Middleware est essentiellement une fontion qui recevra les object Request et Response
// et Comme 3eme argument, une autre fonction next() que l'on appelera une fois notre code middleware terminé 

var middleware1 = function(req, res, next){
    console.log('middleware 1 :', req.url);
    next();
}

var middleware2 = function(req, res, next){
    console.log('middleware 2 :', req.url);
    next();
}

var myLogger = function(req, res, next){
    console.log('Vous etes connecté');
    next();
}

var requestTime = function(req, res, next){
    req.requestTime = new Date(Date.now());
    next();
}

app.use(middleware1);
app.use(middleware2);
app.use(myLogger);
app.use(requestTime);


// get et post sont des methodes HTTP
// '/' est la route
// res.send(...) est l’instruction permettant de retourner une reponse au client

// Envoie dans la reponse "hello world" lorsqu'une requête GET est envoyée et recupère l'heure de reception de la requete
// par l'appel du middleware requestTime
app.get('/', (req, res) =>{
    console.log('requete recu!');
    var responseText = 'Hello world';
    responseText += ' appelé à :' + req.requestTime + '';
    res.send(responseText);
});

app.post('/', function(req, res) {
    res.send('Requete Post');
});

//http://localhost:8080/person/add
//http://localhost:8080/person/edit
//http://localhost:8080/person/search
app.use('/person', person);

app.get('/personne', function(req, res) {
    res.send('Bonjour personne');
})

// La fonction app.listen() est utilisée pour lier et écouter les connexions sur l'hôte et le port spécifiés
app.listen(8080, function(){
    console.log('Express en attente');
});