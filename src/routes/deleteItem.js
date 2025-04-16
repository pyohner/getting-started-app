const db = require('../persistence');
const logger = require('../utils/logger');

module.exports = async (req, res) => {
    await db.removeItem(req.params.id);
    logger.info(`Item deleted: id=${req.params.id}`);
    res.sendStatus(200);
};
