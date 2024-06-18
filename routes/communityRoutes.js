const express = require("express");
const communityController = require("../controllers/communityController");

const router = express.Router();

router.get("/", (req, res) => {
    communityController.getLogin(req, res);
});

router.get("/login", (req, res) => {
    communityController.getLogin(req, res);
});

router.get("/signin", (req, res) => {
    communityController.getSignin(req, res);
});

router.get("/profileEdit", (req, res) => {
    communityController.getProfileEdit(req, res);
});

router.get("/passwordEdit", (req, res) => {
    communityController.getPasswordEdit(req, res);
});

router.get("/board", (req, res) => {
    communityController.getBoard(req, res);
});

router.get("/postWrite", (req, res) => {
    communityController.getPostWrite(req, res);
});

router.get("/postDetail", (req, res) => {
    communityController.getPostDetail(req, res);
});

router.get("/postEdit", (req, res) => {
    communityController.getPostEdit(req, res);
});

module.exports = router;