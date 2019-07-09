"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reposytory_1 = require("../repository/reposytory");
exports.getItems = function (req, res) {
    reposytory_1.cosmosDb.getItems(function (err, results) {
        if (err > 0) {
            res.sendStatus(err);
        }
        else {
            res.status(200).json(results);
        }
    });
};
exports.getItem = function (req, res) {
    reposytory_1.cosmosDb.getItem(req.params.id, function (err, result) {
        if (err > 0) {
            res.sendStatus(err);
        }
        else {
            res.status(200).json(result);
        }
    });
};
exports.addItem = function (req, res) {
    reposytory_1.cosmosDb.addItem(req.body, function (err, result) {
        if (err > 0) {
            res.sendStatus(err);
        }
        else {
            res.status(201).json(result);
        }
    });
};
exports.updateItem = function (req, res) {
    reposytory_1.cosmosDb.updateItem(req.params.id, req.body, function (err, result) {
        if (err > 0) {
            res.sendStatus(err);
        }
        else {
            res.status(200).json(result);
        }
    });
};
exports.deleteItem = function (req, res) {
    reposytory_1.cosmosDb.deleteItem(req.params.id, function (err, result) {
        if (err > 0) {
            res.sendStatus(err);
        }
        else {
            res.sendStatus(204);
        }
    });
};
