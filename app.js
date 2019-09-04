const express = require("express")
const feeRouter = require('./routes/fee')
require("./db/mongoose");


const app = express()
app.use(express.json())
app.use(feeRouter);

app.listen(3001, () => {
	console.log("on 3001")
})
