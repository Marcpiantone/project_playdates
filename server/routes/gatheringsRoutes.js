const express = require("express");

const {
  handleGatherings,
  handleCreateGathering,
  handleGatheringsByTribeId,
  handleUpdateGathering,
} = require("./handlers/gatheringsHandlers");
const router = express.Router();

// define the /gatherings routes
router.get("/", handleGatherings);
router.post("/", handleCreateGathering);
router.get("/:tribeId", handleGatheringsByTribeId);
router.put("/gathering/:_id", handleUpdateGathering);

module.exports = router;
