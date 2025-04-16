const express = require('express');
const morgan  = require('morgan');
const logger  = require('./utils/logger');
const app = express();
const db = require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');


app.use(morgan('combined', {
    stream: { write: msg => logger.info(msg.trim()) }
}));


app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

db.init().then(() => {
    app.listen(3000, () => logger.info('Listening on port 3000'));
}).catch((err) => {
    logger.error(err);
    process.exit(1);
});

const gracefulShutdown = () => {
    logger.info('Shutting down…');
    db.teardown()
        .catch(error => logger.error('Error during teardown', error))
        .then(() => process.exit());
};
['SIGINT','SIGTERM','SIGUSR2'].forEach(sig =>
    process.on(sig, gracefulShutdown)
);
// process.on('SIGINT', gracefulShutdown);
// process.on('SIGTERM', gracefulShutdown);
// process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon

app.use((err, req, res, next) => {
    logger.error('Unhandled error', err);
    res.status(500).send('Internal Server Error');
});