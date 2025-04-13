const express = require("express");
const router = express.Router();
const recordService = require("../recordServer");

router.get("/", async (req, res) => {
  try {
    // Grab the model only when needed, now that it's connected
    const Record = recordService.Record();
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ error: "Error fetching records" });
  }
});

module.exports = router;
