"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cosmosDbConfig = {};
exports.cosmosDbConfig = cosmosDbConfig;
cosmosDbConfig.host = process.env.HOST || "https://cosmosdbfornodejsapp.documents.azure.com:443/";
cosmosDbConfig.authKey = process.env.AUTH_KEY || "TDrSofAVlzLY25bUPwvZMoEtCxY3zhUl90u2PoHthPp6blhtJwu65Br0jKEGSQ0AQ6KhP4p683ELuYCA0IIQNQ==";
