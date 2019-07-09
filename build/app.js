"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = __importStar(require("body-parser"));
var itemsController = __importStar(require("./controllers/itemContoller"));
var app = express_1.default();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', itemsController.getItems);
app.get('/items/:id', itemsController.getItem);
app.post('/items', itemsController.addItem);
app.put('/items/:id', itemsController.updateItem);
app.delete('/items/:id', itemsController.deleteItem);
var port = process.env.port || 3000;
app.listen(app.get("port"), function () {
    console.log('Server Started');
});
