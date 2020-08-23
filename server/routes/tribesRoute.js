const express = require("express");
const {
  handleTribes,
  createTribe,
  handleTribesById,
} = require("./handlers/tribesHandlers");
const router = express.Router();

// define the /tribes routes
router.get("/", handleTribes);
router.get("/:creatorId", handleTribesById);
router.post("/", createTribe);

module.exports = router;
