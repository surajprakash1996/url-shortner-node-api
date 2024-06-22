const express = require("express");
const router = express.Router();
const { handleGenerateShortUrl, handleGetAnalytics, handleRedirectUrl, handleRemoveAllShortIds } = require("../controllers/url");

router.post('/', handleGenerateShortUrl)
router.get('/remove-all', handleRemoveAllShortIds)
router.get('/analytics/:shortid', handleGetAnalytics)
router.get('/:shortid', handleRedirectUrl)

module.exports = router;