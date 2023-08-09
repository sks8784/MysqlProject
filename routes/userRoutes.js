const express = require("express");
const {createDatabase, createUserTable, createUser,createCandidateTable, createCandidate, createCandidateStatusTable, candidateStatus, getCount}  = require("../controllers/userController");

const router = express.Router();

router.get("/createDatabase", createDatabase);
router.get("/createUserTable", createUserTable);
router.post("/createUser", createUser);
router.get("/createCandidateTable", createCandidateTable);
router.post("/createCandidate", createCandidate);
router.get("/createCandidateStatusTable", createCandidateStatusTable);
router.post("/candidateStatus", candidateStatus);
router.get("/getCount/:id", getCount);

module.exports = router;