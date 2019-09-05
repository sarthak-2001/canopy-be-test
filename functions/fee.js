const request = require("request")
const cheerio = require("cheerio")
const login_old = require("./login_old")
const Fee = require("../models/fee")
// require("../db/mongoose")


//TODO : make different function to find student and lock....nned to convert to axios
const lock_true = async function(uid) {
	console.log("turning lock to true\n")
	await Fee.findOneAndUpdate({ studentID: uid }, { lock: true })
	// console.log(fee);
	console.log("time to scrape.....\n")
	// Fee.updateOne()
}
// lock_true('b418045')
const data_writer = async (d, uid) => {
	const now = new Date()

	const fee = await Fee.findOneAndUpdate({ studentID: uid }, { lock: false, data: d, last_updated: now })
	console.log("all done")
}

const fee_extractor = async function(uid, pwd, callback) {
	await lock_true(uid)
	// console.log("uff")

	login_old(uid, pwd, (cookie) => {
		// console.log(cookie);
		console.log("in login_old")

		let option = {
			url: "https://hib.iiit-bh.ac.in/Hibiscus/Fees/stuFee.php?stuid=" + uid,
			headers: {
				Cookie: cookie,
				Referer: "https://hib.iiit-bh.ac.in/Hibiscus/Cms/cmsMenu.php?coid=B216-2~CS102"
			}
		}
		request.post(option, (err, res, html) => {
			var data = {
				Notices: []
			}
			var $ = cheerio.load(html)
			data.Notices.push({
				html: $.html()
			})
			
			callback(data.Notices[0].html, uid)
		})
	})
}



module.exports = { fee_extractor: fee_extractor, data_writer: data_writer }
