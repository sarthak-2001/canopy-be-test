const express = require("express")
const router = new express.Router()
const fee_extract = require("../functions/fee")
const Fee = require("../models/fee")

router.post("/fee", async (req, res) => {
	await fee_extract.fee_extractor(req.body.uid,req.body.pwd,fee_extract.data_writer)
	res.send('done')
	
})

module.exports = router
