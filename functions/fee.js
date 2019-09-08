const request = require("request")
const cheerio = require("cheerio")
const login_old = require("./login_old")
const Fee = require("../models/fee")

const data_writer = async (d, uid) => {
	const now = new Date()

	const fee = await Fee.findOneAndUpdate({ studentID: uid }, { data: d, last_updated: now })

	console.log("all done")
}

const fee_extractor = async function(uid, pwd, callback) {
	login_old(uid, pwd, (cookie) => {
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
