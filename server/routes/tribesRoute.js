const express = require("express");
const {
  handleTribes,
  handleCreateTribe,
  handleTribesByEmail,
  handleTribeById,
  handleUpdateTribe,
} = require("./handlers/tribesHandlers");
const router = express.Router();

// define the /tribes routes
router.get("/", handleTribes);
router.post("/", handleCreateTribe);
router.get("/tribe/:_id", handleTribeById);
router.put("/tribe/:_id", handleUpdateTribe);
router.get("/:memberEmail", handleTribesByEmail);

module.exports = router;
