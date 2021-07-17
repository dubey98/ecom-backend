const express = require("express");

const router = express.Router();

const adminController = require("./../controller/adminController");

// lookup categories
router.get("/lookup-category/count", adminController.countLookupCategory);

router.get("/lookup-category/", adminController.getAllLookupCategory);

router.get("/lookup-category/:id", adminController.getOneLookupCategory);

router.post("/lookup-category/", adminController.createLookupCategory);

router.delete("/lookup-category/", adminController.deleteAllLookupCategory);

router.delete("/lookup-category/:id", adminController.deleteLookupCategory);

router.put("/lookup-category/:id", adminController.updateLookupCategory);

// lookups
router.get("/lookup/", adminController.getAllLookup);

router.get("/lookup/:id", adminController.getOneLookup);

router.post("/lookup/:id?", adminController.createLookup);

router.delete("/lookup/", adminController.deleteAllLookup);

router.delete("/lookup/:id", adminController.deleteLookup);

router.put("/lookup/:id", adminController.updateLookup);

module.exports = router;
