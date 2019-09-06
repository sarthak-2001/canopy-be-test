const mongoose = require("mongoose")

const noticeDataSchema = new mongoose.Schema({
	lock: {
		type: Boolean,
		default: false
	},
	notice_data: {
		type: String,
		default: ""
	},
	last_updated: {
		type: Date
	},
	id: {
		type: String,
		default: ""
	},
	link: {
		type: String,
		default: ""
	}
})

const Notice_data = mongoose.model("notice_data", noticeDataSchema, "notice_data")

module.exports = Notice_data
