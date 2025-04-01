const express = require('express');
const router = express.Router();

const {localFileUpload, imageUpload, videoUpload } = require('../controller/fileUpload');
//mageUpload, videoUpload, imageReducerUpload,

router.post('/imageUpload', imageUpload);
router.post('/videoUpload', videoUpload);
// router.post('/imageReducer', imageReducerUpload);
router.post('/localFileUpload', localFileUpload);

module.exports = router;