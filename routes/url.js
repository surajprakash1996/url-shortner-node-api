const express = require("express");
const router =  express.Router();
const  { handleGenerateShortUrl, handleGetAnalytics, handleRedirectUrl} = require("../controllers/url");

router.post('/', handleGenerateShortUrl )
router.get('/analytics/:shortid', handleGetAnalytics )
router.get('/:shortid', handleRedirectUrl )

module.exports = router;