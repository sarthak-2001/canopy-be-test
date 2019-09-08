const request = require("request")
const cheerio = require("cheerio")
const login_new = require("./login_new")
const Notice_data = require("../models/notice")

const data_writer = async (data) => {
	console.log(data.length)

	for (let index = 0; index < data.length; index++) {
		console.log(index)

		await Notice_data.update(
			{ id: data[index].id },
			{ $set: { attention: data[index].attention, date: data[index].date, id_link: data[index].id_link, posted_by: data[index].posted_by, title: data[index].title } },
			{ upsert: true }
		)
	}

	console.log("done")
}

const notice = async function(uid, pwd, cb) {
	login_new(uid, pwd, (cookie) => {
		let option = {
			url: "https://hib.iiit-bh.ac.in/m-ums-2.0/app.misc/nb/docList.php",
			headers: {
				Cookie: cookie,
				Referer: "https://hib.iiit-bh.ac.in/m-ums-2.0/start/here/?w=766&h=749"
			}
		}

		request.get(option, (err, res, html) => {
			let data = { Notices: [] }
			const $ = cheerio.load(html)
			$("tr")
				.next()
				.each((i, x) => {
					const date = $(x)
						.find("td")
						.eq(0)
						.text()
						.replace(/\s\s+/g, "")
					const title = $(x)
						.find("td")
						.eq(1)
						.text()
						.replace(/\s\s+/g, "")
					const posted_by = $(x)
						.find("td")
						.eq(2)
						.text()
						.replace(/\s\s+/g, "")
					const attention = $(x)
						.find("td")
						.eq(3)
						.text()
						.replace(/\s\s+/g, "")
					const id_link = $(x)
						.find("a")
						.attr("href")
					const id = $(x)
						.find("a")
						.attr("href")
						.slice(17)
					data.Notices.push({
						date: date,
						title: title,
						id: id,
						id_link: id_link,
						posted_by: posted_by,
						attention: attention
					})
				})
			cb(data.Notices)
		})
	})
}

module.exports = { notice_extractor: notice, data_writer: data_writer }
