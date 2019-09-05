const express = require("express")
const router = new express.Router()
const Notice = require('../functions/notice')

router.post("/notice", async (req, res) => {
	console.log('in notice');
	
	await Notice.notice_extractor(req.body.uid,req.body.pwd,Notice.data_writer)
	// await fee_extract.fee_extractor(req.body.uid,req.body.pwd,fee_extract.data_writer)
	res.send('done notice')
	
})

module.exports = router
