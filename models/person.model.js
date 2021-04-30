var sql = require('./../db/db');

var personModel = {};

// Recupere toutes les personnes
personModel.getAllPersons = function(result){
    sql.query("SELECT * FROM person", function(err, res){
        if(err){
            return result(err, null);
        }
        else{
            return result(null, res);
        }
    });
}

// Enregistre un personne
personModel.savePerson = function(newPerson, result){
    sql.query("INSERT INTO person SET ?", newPerson, function(err, res){
        if(err){
            return result(err, null);
        }
        else{
            return result(null, res);
        }  
    });
}

// recupere une personne selon son identifiant
personModel.findPersonById = function(id, result){
    sql.query("SELECT * FROM person WHERE id = " + id, function(err, rows){
        if(err)
            throw err;
        if(rows.length <= 0){
            return result(err, null);
        }
        else{
            return result(null,rows);
        }  
    });
}

// supprime une personne selon son identifiant
personModel.deletePersonById = function(id, result){
    sql.query("DELETE FROM person WHERE id = " + id, function(err, res){
        if(err)
            throw err;
        
        if(res.affectedRows == 0){
            return result(err, null);
        }
        
        return result(null, res);
       
    });
}

// met a jour une personne selon son identifiant
personModel.updatePersonById = function(data, result){
    sql.query("UPDATE person SET ? WHERE id = " + data.id, data, function(err, res){
        if(err)
            throw err;

        if(res.affectedRows == 0){
            return result(err, null);
        }
       
        return result(null, res);
        
    });
}

module.exports = personModel;