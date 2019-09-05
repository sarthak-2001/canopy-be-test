const mongoose = require("mongoose")

// const lockSchema = new mongoose.Schema({
// 	global_lock: {
// 		type: Boolean,
// 		default: false
// 	},
// 	name: {
// 		type: String,
// 		default: "scraper_lock"
// 	}
// })

const noticeSchema = new mongoose.Schema({
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
		unique: true,
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
})

const Notice_data = mongoose.model("Notice_data", noticeSchema, "notices")
// const Lock = mongoose.model("Lock", lockSchema, "notices")

module.exports = Notice_data
