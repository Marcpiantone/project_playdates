const express = require("express");
const { mailSender } = require("./handlers/mailHandlers");
const router = express.Router();

// define the /sendmail routes
router.get("/", (req, res) => res.json({ message: "IT WORKS" }));
router.post("/", mailSender);

module.exports = router;
