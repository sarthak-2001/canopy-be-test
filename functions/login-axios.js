const axios = require("axios")
const qs = require("querystring")
const rp = require("request-promise")
const cheerio = require("cheerio")
const ext = async function(cook) {
	const res = await axios({
		method: "post",
		url: "https://hib.iiit-bh.ac.in/Hibiscus/Fees/stuFee.php?stuid=" + 'b418045',
		headers: {
			Cookie: cook,
			Referer: "https://hib.iiit-bh.ac.in/Hibiscus/Cms/cmsMenu.php?coid=B216-2~CS102"
		}
	})
	console.log(res)
}

const login = async function(uid, pwd) {
	const res = await axios({
		method: "post",
		url: "https://hib.iiit-bh.ac.in/Hibiscus/Login/auth.php?client=iiit",
		data: qs.stringify({
			uid: uid,
			pwd: pwd,
			txtinput: "3",
			sub: "Login"
		}),
		headers: {
			"User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:54.0) Gecko/20100101 Firefox/54.0",
			Connection: "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent" : "PostmanRuntime/7.16.3"
		}
	})
	// console.log(res);
	let cookie = res.headers["set-cookie"][0].slice(0, 36)
    console.log(cookie)
    await ext(cookie)
}

login("b418045", "sarthak@2001")
