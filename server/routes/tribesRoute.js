const express = require("express");
const {
  handleTribes,
  createTribe,
  handleTribesByEmail,
  handleTribeById,
} = require("./handlers/tribesHandlers");
const router = express.Router();

// define the /tribes routes
router.get("/", handleTribes);
router.get("/tribe/:_id", handleTribeById);
router.get("/:memberEmail", handleTribesByEmail);
router.post("/", createTribe);

module.exports = router;
