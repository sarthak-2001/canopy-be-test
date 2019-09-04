const mongoose = require("mongoose")

const noticeSchema = new mongoose.Schema({
	global_lock: {
		type: Boolean,
		default: false
	},
	Notices: [
		{
			attention: {
				default: "",
				type: String
			},
			date: {
				default: "",
				type: String
			},
			id: {
				default: "",
				// unique: true,
				type: String
			},
			id_link: {
				default: "",
				type: String
			},
			posted_by: {
				default: "",
				type: String
			},
			title: {
				default: "",
				type: String
			}
		}
	]
})

const Notice = mongoose.model("Notice", noticeSchema)

module.exports = Notice
