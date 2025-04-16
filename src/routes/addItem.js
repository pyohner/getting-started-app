const db = require('../persistence');
const logger = require('../utils/logger');
const {v4 : uuid} = require('uuid');

module.exports = async (req, res) => {
    const item = {
        id: uuid(),
        name: req.body.name,
        completed: false,
    };

    await db.storeItem(item);
    logger.info(`Item added: id=${item.id}, name="${item.name}"`);
    res.send(item);
};
