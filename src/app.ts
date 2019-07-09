import express from "express";
import * as bodyParser from "body-parser";
import * as itemsController from './controllers/itemContoller';

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', async (req, res, next) => await itemsController.getItems(req, res).catch(next));
// app.get('/items/:id', itemsController.getItem);
// app.post('/items', itemsController.addItem);
// app.put('/items/:id', itemsController.updateItem);
// app.delete('/items/:id', itemsController.deleteItem);

// catch 404 and forward to error handler
app.use((req: any, res: any, next: any) => {
    const err: any = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});


const port = process.env.port || 3000;
app.listen(app.get("port"), () => {
    console.log('Server Started');
});
