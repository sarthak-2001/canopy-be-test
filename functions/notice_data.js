const request = require("request")
const cheerio = require("cheerio")
const login_new = require("./login_new")
const ND = require("../models/notice_data")

async function data_writer(notice_data, attachment, n_id) {
	const now = new Date()
	await ND.findOneAndUpdate({ id: n_id }, { last_updated: now, link: attachment, notice_data: notice_data })

	console.log("DONE")
}

const notice_data_extractor = async function(uid, pwd, n_id, cb) {
	login_new(uid, pwd, (cookie) => {
		let option = {
			url: "https://hib.iiit-bh.ac.in/m-ums-2.0/app.misc/nb/docDet.php?docid=" + n_id,
			headers: {
				Cookie: cookie,
				Referer: "https://hib.iiit-bh.ac.in/m-ums-2.0/app.misc/nb/docList.php"
			}
		}

		request.get(option, (err, res, html) => {
			const $ = cheerio.load(html)
			// console.log($.html())
			// console.log("\n\n\n")

			const notice_html = $("table").html()
			// console.log(notice_html)
			let attachment = $("a").attr("href")
			if (attachment == "docList.php") {
				a_html = ""
			} else {
				a_html = "https://hib.iiit-bh.ac.in/m-ums-2.0" + attachment.slice(5)
			}
			// console.log("\n\n\n")
			// console.log(a_html)

			cb(notice_html, a_html, n_id)
		})
	})
}

module.exports = { notice_data_extractor, data_writer }
