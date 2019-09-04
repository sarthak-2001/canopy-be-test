const express = require("express")
const router = new express.Router()
const Notice = require("../models/notice")

router.post("/fee", async (req, res) => {
	// await fee_extract.fee_extractor(req.body.uid,req.body.pwd,fee_extract.data_writer)
	res.send('done notice')
	
})

module.exports = router
