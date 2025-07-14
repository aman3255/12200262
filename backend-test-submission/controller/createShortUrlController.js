const { Log } = require('../../logging-middleware/logger')
const { createShortUrl } = require('../service/url.service')

const createShortUrlController = async (req, res) => {
    try {
        const { url, validity = 30, shortcode } = req.body;

        if (!url) {
            await Log('backend', 'error', 'handler', 'Missing required field: url');
            return res.status(400).json({ message: 'URL is required' });
        }

        const newShortUrl = await createShortUrl({
            url,
            validity,
            shortcode,
        });

        await Log('backend', 'info', 'controller', 'Short URL created successfully');

        res.status(201).json({
            shortLink: `${req.protocol}://${req.get('host')}/${newShortUrl.shortcode}`,
            expiry: new Date(newShortUrl.expiry).toISOString(), // ✅ ensure it’s a valid date
        });

    } catch (error) {
        await Log('backend', 'fatal', 'controller', `Error in createShortUrlController: ${error.message}`);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};


module.exports = {
    createShortUrlController
}