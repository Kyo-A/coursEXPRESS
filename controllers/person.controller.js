var personModel = require('./../models/person.model');
const { NotFound } = require('../utils/errors');

var personController = function () { }

personController.show = function (req, res) {

    personModel.getAllPersons(function (err, result) {
        if (err)
            throw err;
        res.json({
            status: 200,
            result,
            message: "Success getAllPersons"
        })

    })
}

personController.findById = function (req, res, next) {

    let id = req.params.id;

    personModel.findPersonById(id, function (err, result) {
        try {
            if (result == null)
                throw new NotFound('Bad Values: ' + id + ' Insert a correct value');

            res.json({
                status: 200,
                result,
                message: "Success findById"
            })
        } catch (err) {
            next(err);
        }
    })

}

personController.save = function (req, res, next) {

    let data = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        salaire: req.body.salaire,
        ville: req.body.ville
    };

    personModel.savePerson(data, function (err, result) {
        if (err)
            throw err;
        res.json({
            status: 200,
            result,
            message: "Success save"
        })

    })

}

personController.delete = function (req, res, next) {
    let id = req.params.id;

    personModel.deletePersonById(id, function (err, result) {
        try {
            if (result == null)
                throw new NotFound('Bad Values: ' + id + ' Insert a correct value');

            res.json({
                status: 200,
                result,
                message: "Success findById"
            })
        } catch (err) {
            next(err);
        }
    })
}

personController.update = function (req, res, next) {

    let data = {
        id: req.params.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        salaire: req.body.salaire,
        ville: req.body.ville
    };

    personModel.updatePersonById(data, function (err, result) {
        try {
            if (result == null)
                throw new NotFound('Bad Values: ' + data.id + ' Insert a correct value');


            res.json({
                status: 200,
                message: "Success update"
            })
        } catch (err) {
            next(err);
        }
    })
}

module.exports = personController;