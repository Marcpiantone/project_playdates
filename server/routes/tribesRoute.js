const express = require("express");
const { handleTribes } = require("./handlers/tribesHandlers");
const router = express.Router();

// define the home page route
router.get("/", handleTribes);

module.exports = router;
