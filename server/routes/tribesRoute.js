const express = require("express");
const {
  handleTribes,
  createTribe,
  handleTribeById,
} = require("./handlers/tribesHandlers");
const router = express.Router();

// define the /tribes routes
router.get("/", handleTribes);
router.get("/:creatorId", handleTribeById);
router.post("/", createTribe);

module.exports = router;
