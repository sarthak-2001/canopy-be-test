const request = require("request")
const cheerio = require("cheerio")
const login = require("./login")
const Fee = require("../models/fee")
// require("../db/mongoose")

const lock_true = async function(uid) {
	console.log("turning lock to true\n")
	const fee = await Fee.findOneAndUpdate({ studentID: uid }, { lock: true })
	// console.log(fee);
	console.log("time to scrape.....\n")
	// Fee.updateOne()
}
// lock_true('b418045')
const data_writer = async (d,uid) => {
	
	const now = new Date();

	const fee = await Fee.findOneAndUpdate({ studentID: uid }, { lock: false, data:d,last_updated: now })
	console.log('all done');
	
}

const fee_extractor = async function(uid, pwd, callback) {
	await lock_true("b418045")
	// console.log("uff")

	login(uid, pwd, (cookie) => {
		// console.log(cookie);

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
			// console.log(data)
			// console.log("scraper_-_")

			callback(data.Notices[0].html,uid)
		})
	})
}



module.exports = {fee_extractor:fee_extractor,
					data_writer: data_writer}
