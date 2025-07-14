const UrlModel = require('../model/url.model');
const crypto = require('crypto');

const generateShortcode = () => {
    return crypto.randomBytes(3).toString('hex'); 
};


const isShortcodeAvailable = async (shortcode) => {
    const existing = await UrlModel.findOne({ shortcode });
    return !existing;
};


const createShortUrl = async ({ url, shortcode, validity }) => {
    const code = shortcode || generateShortcode();

    if (!(await isShortcodeAvailable(code))) {
        throw new Error('Shortcode already in use. Try a different one.');
    }

    const createdAt = new Date();
    const expiry = new Date(createdAt.getTime() + (validity || 30) * 60000); 

    const newUrl = await UrlModel.create({
        originalUrl: url,
        shortcode: code,
        createdAt,
        expiry,
        clickCount: 0,
        clickAnalytics: [],
    });

    return newUrl;
};

// Get stats for a shortcode
const getStatsByShortcode = async (shortcode) => {
    const entry = await UrlModel.findOne({ shortcode });

    if (!entry) {
        return null; // Let the controller handle the 404
    }

    return {
        url: entry.originalUrl,
        createdAt: entry.createdAt,
        expiry: entry.expiry,
        clicks: entry.clickAnalytics || []
    };
};
module.exports = {
    createShortUrl,
    getStatsByShortcode,
};
