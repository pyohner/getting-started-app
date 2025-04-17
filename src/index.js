const express = require('express');
const morgan  = require('morgan');
const logger  = require('./utils/logger');
const os= require('os');
const app = express();
const db= require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');
const fs= require('fs');

// resolve container name from Docker metadata if available
function getContainerName() {
    try {
        // This will be something like: getting-started-app_app_2
        return fs.readFileSync('/etc/hostname', 'utf8').trim();
    } catch (err) {
        return os.hostname();
    }
}

// Log HTTP requests via morgan into the custom logger
app.use(morgan('combined', {
    stream: { write: msg => logger.info(msg.trim()) }
}));

// Attach the container's hostname to every response header
app.use((req, res, next) => {
    const instanceId = getContainerName();
    res.setHeader('X-Instance-Id', instanceId);
    next();
});

app.use(express.json());
app.use(express.static(__dirname + '/static'));

// CRUD routes
app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

// Initialize DB, then start server
db.init().then(() => {
    app.listen(3000, () => logger.info('Listening on port 3000'));
}).catch((err) => {
    logger.error(err);
    process.exit(1);
});

// Graceful shutdown on signals
const gracefulShutdown = () => {
    logger.info('Shutting down…');
    db.teardown()
        .catch(error => logger.error('Error during teardown', error))
        .then(() => process.exit());
};
['SIGINT','SIGTERM','SIGUSR2'].forEach(sig =>
    process.on(sig, gracefulShutdown)
);

// Global error handler
app.use((err, req, res) => {
    logger.error('Unhandled error', err);
    res.status(500).send('Internal Server Error');
});