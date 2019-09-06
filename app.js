const express = require("express")
const feeRouter = require('./routes/fee')
const noticeRouter = require('./routes/notice')
const notice_dataRouter = require('./routes/notice_data')
require("./db/mongoose");


const app = express()
app.use(express.json())
app.use(feeRouter);
app.use(noticeRouter)
app.use(notice_dataRouter)

app.listen(3001, () => {
	console.log("on 3001")
})
