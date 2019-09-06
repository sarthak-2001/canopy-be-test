const express = require('express')
const router = new express.Router()
const ND_extract = require('../functions/notice_data')


router.post("/notice_data", async (req, res) => {
	console.log('yoo');
	
    ND_extract.notice_data_extractor(req.body.uid,req.body.pwd,req.body.id,ND_extract.data_writer)
	res.send('done')
	
})

module.exports = router