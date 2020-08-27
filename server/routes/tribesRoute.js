const express = require("express");
const {
  handleTribes,
  createTribe,
  handleTribesByEmail,
} = require("./handlers/tribesHandlers");
const router = express.Router();

// define the /tribes routes
router.get("/", handleTribes);
router.get("/:memberEmail", handleTribesByEmail);
router.post("/", createTribe);

module.exports = router;
