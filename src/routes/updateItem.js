const db = require('../persistence');
const logger = require('../utils/logger');


module.exports = async (req, res) => {
    await db.updateItem(req.params.id, {
        name: req.body.name,
        completed: req.body.completed,
    });
    const item = await db.getItem(req.params.id);

    logger.info(
        `Item updated: id=${req.params.id}, name="${req.body.name}", completed=${req.body.completed}`
    );
    res.send(item);
};
