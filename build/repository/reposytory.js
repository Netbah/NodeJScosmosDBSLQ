"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var documentdb_1 = require("documentdb");
var dbconfig_1 = require("../dbconfig");
var DbRepository = /** @class */ (function () {
    function DbRepository(docClient) {
        this.docClient = docClient;
        this.collection = {};
    }
    DbRepository.prototype.init = function () {
        var _this = this;
        var dbQuery = {
            query: 'SELECT * FROM root r WHERE r.id= @id',
            parameters: [{
                    name: '@id',
                    value: 'ToDoList'
                }]
        };
        this.docClient.queryDatabases(dbQuery).toArray(function (err, dbs) {
            var db = dbs[0];
            var colQuery = {
                query: 'SELECT * FROM root r WHERE r.id=@id',
                parameters: [{
                        name: '@id',
                        value: 'Items'
                    }]
            };
            _this.docClient.queryCollections(db._self, colQuery).toArray(function (err, collections) {
                _this.collection = collections[0];
                console.log('initialization finished');
            });
        });
    };
    DbRepository.prototype.getItems = function (callback) {
        var querySpec = {
            query: 'SELECT * FROM root',
            parameters: []
        };
        this.docClient.queryDocuments(this.collection._self, querySpec).toArray(function (err, results) {
            if (null == err) {
                callback(0, results);
            }
            else {
                callback(err.code, null);
            }
        });
    };
    DbRepository.prototype.getItem = function (id, callback) {
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id = @id',
            parameters: [{
                    name: '@id',
                    value: id
                }]
        };
        this.docClient.queryDocuments(this.collection._self, querySpec).toArray(function (err, results) {
            if (null == err && results.length > 0) {
                callback(0, results[0]);
            }
            else {
                callback(404, null);
            }
        });
    };
    DbRepository.prototype.updateItem = function (id, target, callback) {
        var _this = this;
        this.getItem(id, function (err, doc) {
            if (0 == err) {
                doc.title = target.title;
                doc.description = target.description;
                _this.docClient.replaceDocument(doc._self, doc, function (err, result) {
                    callback(0, result);
                });
            }
            else {
                callback(404, null);
            }
        });
    };
    DbRepository.prototype.deleteItem = function (id, callback) {
        var _this = this;
        this.getItem(id, function (err, doc) {
            if (0 == err) {
                _this.docClient.deleteDocument(doc._self, function (err) {
                    callback(0, null);
                });
            }
            else {
                callback(404, null);
            }
        });
    };
    DbRepository.prototype.addItem = function (item, callback) {
        this.docClient.createDocument(this.collection._self, item, function (err, result) {
            if (null == err) {
                callback(0, result);
            }
            else {
                callback(err.code, null);
            }
        });
    };
    return DbRepository;
}());
var docDbClient = new documentdb_1.DocumentClient(dbconfig_1.cosmosDbConfig.host, {
    masterKey: dbconfig_1.cosmosDbConfig.authKey
});
var cosmosDb = new DbRepository(docDbClient);
exports.cosmosDb = cosmosDb;
cosmosDb.init();
